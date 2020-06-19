import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { get, isObject, omitBy, merge, zipObjectDeep } from 'lodash';
import Linkify from 'linkifyjs/react';

import { getUserEnrollment } from '../../lib/services';
import ActionButton from './ActionButton';
import ActivityFeed from './ActivityFeed';
import { ScrollablePanel } from '../Scrollable';
import EnrollmentHasCopiesNotification from './EnrollmentHasCopiesNotification';
import PreviousEnrollmentSection from '../form-sections/PreviousEnrollmentSection';
import Stepper from '../form-sections/PreviousEnrollmentSection/Stepper';
import { TARGET_API_LABELS } from '../../lib/api';

export const FormContext = React.createContext();

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { target_api } = props;

    this.state = {
      errorMessages: [],
      successMessages: [],
      isUserEnrollmentLoading: true,
      enrollment: {
        acl: {
          update: true,
          send_application: true, // Enable edition for new enrollment (ie. enrollment has no id)
        },
        events: [],
        target_api,
        additional_content: {},
      },
    };
  }

  componentDidMount() {
    const id = this.props.enrollmentId;
    document.title = `${TARGET_API_LABELS[this.props.target_api]}`;

    if (!id) {
      return this.setState({ isUserEnrollmentLoading: false });
    }

    getUserEnrollment(id)
      .then(enrollment => {
        document.title = `${enrollment.id} - ${enrollment.intitule}`;
        this.setState(({ enrollment: prevEnrollment }) => ({
          isUserEnrollmentLoading: false,
          enrollment: merge(
            {},
            prevEnrollment,
            omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
          ),
        }));
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/');
        }
      });
  }

  updateEnrollment = enrollment => {
    if (!this.state.enrollment.id && enrollment.id) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${
          window.location.pathname.endsWith('/') ? '' : '/'
        }${enrollment.id}`
      );
    }

    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
      ),
    }));
  };

  handleChange = ({
    target: { type = null, checked = null, value: inputValue, name },
  }) => {
    const value = type === 'checkbox' ? checked : inputValue;

    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        zipObjectDeep([`${name}`], [value])
      ),
    }));
  };

  handleSubmit = ({
    errorMessages = [],
    successMessages = [],
    redirectToHome = false,
  }) => {
    if (
      redirectToHome &&
      isObject(this.props.history.location.state) &&
      this.props.history.location.state.fromList
    ) {
      return this.props.history.goBack();
    }

    if (redirectToHome) {
      return this.props.history.push('/');
    }

    return this.setState({ errorMessages, successMessages });
  };

  render() {
    const {
      enrollment,
      errorMessages,
      successMessages,
      isUserEnrollmentLoading,
    } = this.state;

    const {
      title,
      DemarcheDescription,
      location,
      steps,
      PreviousEnrollmentDescription,
    } = this.props;

    const { acl, events } = enrollment;

    return (
      <>
        <ScrollablePanel scrollableId="head" className={null}>
          <h2 id="head">
            {title}
            {enrollment.id ? ` n°${enrollment.id}` : ''}
          </h2>
          {get(location, 'state.fromFranceConnectedAPI') ===
            'api_droits_cnam' && (
            <>
              <p>
                La procédure consiste en 2 demandes d'accès distinctes&nbsp;:
              </p>
              <Stepper
                steps={['franceconnect', 'api_droits_cnam']}
                currentStep="franceconnect"
              />
            </>
          )}
          {get(location, 'state.fromFranceConnectedAPI') ===
            'api_impot_particulier' && (
            <>
              <p>
                La procédure consiste en 3 demandes d'accès distinctes&nbsp;:
              </p>
              <Stepper
                steps={[
                  'franceconnect',
                  'api_impot_particulier',
                  'api_impot_particulier_step2',
                ]}
                currentStep="franceconnect"
              />
            </>
          )}
          {steps && (
            <FormContext.Provider
              value={{
                disabled: !acl.send_application,
                onChange: this.handleChange,
                enrollment,
                isUserEnrollmentLoading,
              }}
            >
              <PreviousEnrollmentSection
                steps={steps}
                Description={PreviousEnrollmentDescription}
              />
            </FormContext.Provider>
          )}
          {get(location, 'state.source') === 'copy-authorization-request' && (
            <div className="notification warning">
              Vous trouverez ci dessous une copie de votre demande initiale.
              Merci de vérifier que ces informations sont à jour puis cliquez
              sur "Soumettre la demande".
            </div>
          )}

          <EnrollmentHasCopiesNotification enrollmentId={enrollment.id} />

          {!isUserEnrollmentLoading && acl.update && (
            <>
              <div className="notification info">
                Pensez à sauvegarder régulièrement votre demande en brouillon.
              </div>
              <DemarcheDescription />
            </>
          )}
        </ScrollablePanel>

        {events.length > 0 && <ActivityFeed events={events} />}
        <FormContext.Provider
          value={{
            disabled: !acl.send_application,
            onChange: this.handleChange,
            enrollment,
            isUserEnrollmentLoading,
          }}
        >
          {this.props.children}
        </FormContext.Provider>
        {successMessages.map(successMessage => (
          <div key={successMessage} className="notification success">
            <Linkify>{successMessage}</Linkify>
          </div>
        ))}
        {errorMessages.map(errorMessage => (
          <div
            key={errorMessage}
            className="notification error"
            style={{ whiteSpace: 'pre-line' }}
          >
            <Linkify>{errorMessage}</Linkify>
          </div>
        ))}

        <ActionButton
          enrollment={this.state.enrollment}
          updateEnrollment={this.updateEnrollment}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  DemarcheDescription: PropTypes.func,
  enrollmentId: PropTypes.string,
  target_api: PropTypes.string.isRequired,
  steps: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        fromList: PropTypes.bool,
      }),
    }),
  }),
};

Form.defaultProps = {
  enrollmentId: null,
  steps: undefined,
  DemarcheDescription: () => null,
};

export default withRouter(Form);