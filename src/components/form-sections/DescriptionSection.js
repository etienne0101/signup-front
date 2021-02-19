import React, { useContext } from 'react';
import { ScrollablePanel } from '../Scrollable';
import { FormContext } from '../Form';
import PropTypes from 'prop-types';
import TextInput from '../Form/components/TextInput';
import TextAreaInput from '../Form/components/TextAreaInput';

const DescriptionSection = ({
  intitulePlaceholder = '',
  descriptionPlaceholder = '',
  descriptionHelper = null,
}) => {
  const {
    disabled,
    onChange,
    enrollment: { intitule = '', description = '' },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="description">
      <h2>Description du(des) service(s)</h2>
      <TextInput
        label="Nom du(des) service(s)"
        helper={
          'Il doit permettre de faciliter l’identification de votre service. Cette information pouvant être rendue ' +
          'publique, il convient d’être synthétique et précis.'
        }
        meta="Cette information peut être rendue publique."
        name="intitule"
        placeholder="« Service d'état civil », « service informatique »"
        value={intitule}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

DescriptionSection.propTypes = {
  intitulePlaceholder: PropTypes.string,
  descriptionPlaceholder: PropTypes.string,
  descriptionHelper: PropTypes.string,
};

export default DescriptionSection;
