import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import _, { difference, groupBy, isEmpty, zipObject } from 'lodash';
import { ScrollablePanel } from '../../Scrollable';
import Scopes from './Scopes';
import { FormContext } from '../../Form';
import UseCase from './UseCases';

const DonneesSection = ({
  DonneesDescription = () => null,
  AdditionalRgpdAgreement = () => null,
  DonneesFootnote = () => null,
  scopesLabel,
  availableScopes,
  useCases = [],
}) => {
  const {
    disabled,
    onChange,
    enrollment: { additional_content = {}, scopes = {} },
  } = useContext(FormContext);

  useEffect(() => {
    if (isEmpty(scopes)) {
      onChange({
        target: {
          name: 'scopes',
          value: zipObject(
            availableScopes.map(({ value }) => value),
            availableScopes.map(
              ({ mandatory, checkedByDefault }) =>
                !!mandatory || !!checkedByDefault
            )
          ),
        },
      });
    }
  });

  if (isEmpty(scopes)) {
    return null;
  }

  const groupTitleScopesGroup = groupBy(
    availableScopes,
    e => e.groupTitle || 'default'
  );

  const hasDefaultGroup = availableScopes.some(e => !e.groupTitle);

  // {'a': true, 'b': false, 'c': true} becomes ['a', 'c']
  const scopesAsArray = _(scopes)
    .omitBy(e => !e)
    .keys()
    .value();
  const availableScopesAsArray = availableScopes.map(({ value }) => value);
  const outdatedScopes = difference(scopesAsArray, availableScopesAsArray);

  return (
    <ScrollablePanel scrollableId="donnees">
      <h2>Les démarches en ligne auxquelles vous souhaitez vous abonner</h2>
      <DonneesDescription />
      <AdditionalRgpdAgreement
        disabled={disabled}
        onChange={onChange}
        additional_content={additional_content}
      />
      {!isEmpty(useCases) && (
        <UseCase availableScopes={availableScopes} useCases={useCases} />
      )}
      <p>
        {scopesLabel
          ? scopesLabel
          : isEmpty(useCases)
          ? 'Sélectionnez les démarches en ligne pour lesquelles vous souhaitez abonner votre service :'
          : 'Liste des données correspondantes :'}
      </p>
      {Object.keys(groupTitleScopesGroup).map(group => (
        <Scopes
          key={group}
          title={group === 'default' ? null : group}
          scopes={groupTitleScopesGroup[group]}
          selectedScopes={scopes}
          disabledApplication={disabled}
          handleChange={onChange}
          useCategoryStyle={!hasDefaultGroup}
        />
      ))}
      {disabled && !isEmpty(outdatedScopes) && (
        <Scopes
          title="Les données suivantes ont été sélectionnées mais ne sont plus disponibles :"
          scopes={outdatedScopes.map(value => ({ value, label: value }))}
          selectedScopes={zipObject(
            outdatedScopes,
            Array(outdatedScopes.length).fill(true)
          )}
          disabledApplication={true}
          handleChange={() => null}
        />
      )}
      <DonneesFootnote />
    </ScrollablePanel>
  );
};

DonneesSection.propTypes = {
  DonneesDescription: PropTypes.func,
  AdditionalRgpdAgreement: PropTypes.func,
  DonneesFootnote: PropTypes.func,
  scopesLabel: PropTypes.string,
  availableScopes: PropTypes.array.isRequired,
};

export default DonneesSection;
