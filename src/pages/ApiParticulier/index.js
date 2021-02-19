import React from 'react';
import PropTypes from 'prop-types';

import Form from '../../components/Form';
import Nav from '../../components/Nav';
import OrganisationSection from '../../components/form-sections/OrganisationSection';
import DemarcheSection from '../../components/form-sections/DemarcheSection';
import DescriptionSection from '../../components/form-sections/DescriptionSection';
import DonneesSection from '../../components/form-sections/DonneesSection';
import CadreJuridiqueSection from '../../components/form-sections/CadreJuridiqueSection';
import CguSection from '../../components/form-sections/CguSection';
import DonneesPersonnellesSection from '../../components/form-sections/DonneesPersonnellesSection';
import MiseEnOeuvreSection from '../../components/form-sections/MiseEnOeuvreSection';
import demarches from './demarches.json';
import Quote from '../../components/Form/components/Quote';

const DemarcheDescription = () => (
  <div style={{ color: 'red' }} className="notification grey">
    <p>
      Pour avoir accès à l’API Particulier, diffusant des données personnelles,
      vous devez obtenir un agrément. L’accès à cette API n’est pour l’instant
      disponible que si vous êtes&nbsp;:
    </p>
    <ul>
      <li>une administration</li>
      <li>
        une entreprise prestataire d’une administration ou ayant une délégation
        de service public
      </li>
    </ul>
    <p>
      Pour utiliser API Particulier, vous devez vous engager à traiter la bonne
      donnée par le bon agent de votre administration et informer correctement
      l’usager.
    </p>
  </div>
);

const contacts = {
  technique: {
    heading: 'Délégué technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail pour les
        abonnements en mode API. [À VENIR]
      </p>
    ),
    email: '',
    phone_number: '',
  },
  metier: {
    heading: "Responsable technique de l'entité",
    description: (
      <p>
        Cette personne disposera des droits d'accès à la gestion des abonnements
        au sein du hub d'échange de l'état. Elle sera contacté en cas de
        problème technique.
      </p>
    ),
    email: '',
    phone_number: '',
  },
};

const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier de l'abonnement aux démarches en ligne le cadre
      légal et réglementaire doit permettre à la DINUM de transmettre des
      données personnelles à votre entité administrative.
    </p>
    <p>
      [ajouter ici le texte de Cindy : merci de prendre connaissance, changez en
      si vous n'êtes pas une collectivité]
      {/*  TODO une jusitifcation par démarche */}
    </p>
  </Quote>
);

const DonneesDescription = () => (
  <Quote>
    <p>
      La loi informatique et libertés définit les principes à respecter lors de
      la collecte, du traitement et de la conservation de données personnelles.
    </p>
  </Quote>
);

const availableScopes = [
  {
    value: 'dgfip_avis_imposition',
    label: 'CertDc - Certificat de Décès',
  },
  {
    value: 'dgfip_avis_imposition',
    label: 'AEC - Acte État Civil',
    mandatory: true,
  },
  {
    value: 'dgfip_avis_imposition',
    label: 'RCO - Recensement Citoyen Obligatoire',
    mandatory: true,
  },
  {
    value: 'dgfip_avis_imposition',
    label: 'JCC - Déclaration de Changement de Coordonnées',
    mandatory: true,
  },
  {
    value: 'dgfip_avis_imposition',
    label: 'DDPACS - Dépôt de Dossier PACS',
    mandatory: true,
  },
  {
    value: 'dgfip_avis_imposition',
    label: "DOC - Déclaration d'Ouverture de Chantier",
    mandatory: true,
  },
  {
    value: 'dgfip_avis_imposition',
    label: 'LocTo - Déclaration en mairie des location touristique',
    mandatory: true,
  },
];

const ApiParticulier = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <div className="dashboard">
    <Nav
      navLinks={[
        { id: 'head', label: 'Formulaire', style: { fontWeight: 'bold' } },
        { id: 'organisation', label: 'Organisation' },
        { id: 'modeles-preremplis', label: 'Modèles pré-remplis' },
        { id: 'donnees', label: 'Données' },
        { id: 'description', label: 'Description' },
        { id: 'cadre-juridique', label: 'Cadre juridique' },
        { id: 'donnees-personnelles', label: 'Données personnelles' },
        { id: 'contacts-moe', label: 'Mise en œuvre' },
        { id: 'cgu', label: "Modalités d'utilisation" },
      ]}
      contactInformation={[
        {
          email: 'contact@particulier.api.gouv.fr',
          label: 'Nous contacter',
          subject: 'Contact%20via%20datapass.api.gouv.fr',
        },
      ]}
    />
    <div className="main">
      <Form
        enrollmentId={enrollmentId}
        target_api="api_particulier"
        title="Demande d'abonnement à une démarche en ligne"
        DemarcheDescription={DemarcheDescription}
        demarches={demarches}
      >
        <OrganisationSection />
        <DonneesSection
          availableScopes={availableScopes}
          DonneesDescription={DonneesDescription}
        />
        <DescriptionSection
          intitulePlaceholder={
            "« Service d'état civil », « service informatique »"
          }
        />
        <CadreJuridiqueSection
          CadreJuridiqueDescription={CadreJuridiqueDescription}
        />
        <MiseEnOeuvreSection initialContacts={contacts} />
        <CguSection cguLink="https://particulier.api.gouv.fr/API_Particulier_modalites.pdf" />
      </Form>
    </div>
  </div>
);

ApiParticulier.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      enrollmentId: PropTypes.string,
    }),
  }),
};

ApiParticulier.defaultProps = {
  match: {
    params: {
      enrollmentId: null,
    },
  },
};

export default ApiParticulier;
