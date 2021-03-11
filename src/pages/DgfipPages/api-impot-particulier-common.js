import React, { useContext, useEffect, useState } from 'react';
import Quote from '../../components/Form/components/Quote';
import FileInput from '../../components/Form/components/FileInput';
import { FormContext } from '../../components/Form';
import { isEmpty } from 'lodash';
import CheckboxInput from '../../components/Form/components/CheckboxInput';

export const DemarcheDescription = () => (
  <div className="notification grey">
    <p>
      Dans le cadre du programme « Dites-le nous une fois », visant à simplifier
      les démarches administratives des usagers, l’API Impôt particulier permet
      l’échange d’informations fiscales, dans le cadre d’un téléservice, entre
      la DGFiP et une entité administrative ou une entreprise dans le cadre de
      ses obligations légales et réglementaires pour des missions d’intérêt
      général. L’usager n'a plus besoin de transmettre les données fiscales déjà
      transmises à la DGFiP.
    </p>
    <p>
      Ce portail vous permet en qualité de fournisseur de services de demander
      le raccordement de votre téléservice à l’API Impôt particulier.
    </p>
    <p>
      Pour cela, il vous est demandé de compléter le plus précisément possible
      les informations demandées dans le formulaire de souscription en ligne, en
      particulier pour ce qui concerne :
    </p>
    <ul>
      <li>les données nécessaires à la démarche administrative ;</li>
      <li>la volumétrie de sollicitation de l’API ;</li>
      <li>le cadre juridique.</li>
    </ul>
    <p>
      Pour faciliter votre raccordement à l’API Impôt particulier, l’accès à un
      environnement de test (bac à sable) vous sera proposé après validation de
      cette première étape.
    </p>
  </div>
);

export const DemarcheDescriptionProduction = () => (
  <div className="notification grey">
    <p>
      Votre demande d'habilitation pour accéder à l'API « bac à sable » a été
      acceptée, vous pouvez maintenant construire votre démarche/téléservice en
      utilisant l'API exposée dans un environnement bac à sable. Parallèlement
      au développement, vous devez remplir les informations ci-dessous. Elles
      sont nécessaires pour obtenir l'habilitation de l'accès à l'API de
      production.
    </p>
  </div>
);

export const PreviousEnrollmentDescription = () => (
  <Quote>
    <p>
      Vous devez tout d'abord sélectionner la démarche que vous souhaitez
      poursuivre.
    </p>
  </Quote>
);

export const DonneesDescription = () => (
  <Quote>
    <p>
      La loi informatique et libertés définit les principes à respecter lors de
      la collecte, du traitement et de la conservation de données personnelles.
    </p>
    <p>L’article 6 précise :</p>
    <ul>
      <li>
        3° [les données] sont adéquates, pertinentes et non excessives au regard
        des finalités pour lesquelles elles sont collectées et de leurs
        traitements ultérieurs ;
      </li>
      <li>
        4° Elles sont exactes, complètes et, si nécessaire, mises à jour ; les
        mesures appropriées doivent être prises pour que les données inexactes
        ou incomplètes au regard des finalités pour lesquelles elles sont
        collectées ou traitées soient effacées ou rectifiées ;
      </li>
    </ul>
    <p>
      Nous vous remercions de sélectionner uniquement les données strictement
      nécessaires à votre téléservice.
    </p>
    <p>
      Le non-respect du principe de proportionnalité vous expose vis à vis de la
      CNIL.
    </p>
  </Quote>
);

export const DonneesFootnote = () => {
  const {
    disabled,
    onChange,
    enrollment: { documents = [], documents_attributes = [] },
  } = useContext(FormContext);
  const [isFileInputExpanded, setFileInputExpanded] = useState(
    !isEmpty(
      documents.filter(
        ({ type }) => type === 'Document::ExpressionBesoinSpecifique'
      )
    )
  );

  useEffect(() => {
    const hasDocument = !isEmpty(
      documents.filter(
        ({ type }) => type === 'Document::ExpressionBesoinSpecifique'
      )
    );
    if (!isFileInputExpanded && hasDocument) {
      setFileInputExpanded(true);
    }
  }, [isFileInputExpanded, documents]);

  return (
    <>
      <div className="form__group">
        <small className="card__meta">
          <i>
            <a
              href="/docs/presentation_de_l_api_impot_particulier___v1.6.1.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Document pdf précisant les données proposées"
            >
              Ce document
            </a>{' '}
            présente les modalités d'appel et de réponse de l'API Impôt
            particulier, et décrit les données proposées.
          </i>
        </small>
      </div>
      <Quote>
        <div style={{ margin: '1em 0.5em 1em 0' }}>
          <b>Expression de besoin spécifique</b>
          <p>
            Les partenaires ayant convenu avec la DGFiP un périmètre de données
            particulier peuvent rattacher leur expression de besoin listant
            l’ensemble des données strictement nécessaires à leur cas d’usage.
          </p>
          <CheckboxInput
            label="J'ai une expression de besoin spécifique"
            value={isFileInputExpanded}
            onChange={() => setFileInputExpanded(!isFileInputExpanded)}
            disabled={disabled}
          />
          {isFileInputExpanded && (
            <>
              <p>
                <i>
                  Attention : seule l’expression de besoin en données ayant déjà
                  été partagée avec la DGFiP peut être rattachée à votre
                  demande.
                </i>
              </p>
              <FileInput
                label="Joindre l'expression de besoin"
                mimeTypes="*"
                disabled={disabled}
                uploadedDocuments={documents}
                documentsToUpload={documents_attributes}
                documentType={'Document::ExpressionBesoinSpecifique'}
                handleChange={onChange}
              />
            </>
          )}
        </div>
      </Quote>
    </>
  );
};

export const demarches = {
  default: {
    label: 'Demande libre',
    state: {
      dgfip_aft: false,
      dgfip_nbpart: false,
      dgfip_rfr: false,
      dgfip_annee_n_moins_1: false,
    },
  },
  carte_stationnement: {
    label: 'Délivrance d’une carte de stationnement',
    state: {
      scopes: {
        dgfip_aft: true,
        dgfip_annee_n_moins_1: true,
      },
    },
  },
  quotient_familial: {
    label: 'Calcul du quotient familial pour les prestations municipales',
    state: {
      scopes: {
        dgfip_nbpart: true,
        dgfip_rfr: true,
        dgfip_annee_n_moins_1: true,
      },
    },
  },
};

export const availableScopes = [
  {
    value: 'dgfip_annee_n_moins_1',
    label: 'Dernière année de revenu',
    groupTitle: 'Années sur lesquelles porte votre demande',
  },
  {
    value: 'dgfip_annee_n_moins_2',
    label: 'Avant-dernière année de revenu',
    groupTitle: 'Années sur lesquelles porte votre demande',
  },
  {
    value: 'dgfip_annee_n_moins_3',
    label: 'Avant-avant-dernière année de revenu',
    groupTitle: 'Années sur lesquelles porte votre demande',
  },
  {
    value: '',
    label: 'Nom',
    groupTitle: 'État civil - déclarant 1',
  },
  {
    value: '',
    label: 'Nom de naissance',
    groupTitle: 'État civil - déclarant 1',
  },
  {
    value: '',
    label: 'Prénom(s)',
    groupTitle: 'État civil - déclarant 1',
  },
  {
    value: '',
    label: 'Date de naissance',
    groupTitle: 'État civil - déclarant 1',
  },
  {
    value: '',
    label: 'Nom',
    groupTitle: 'État civil - déclarant 2',
  },
  {
    value: '',
    label: 'Nom de naissance',
    groupTitle: 'État civil - déclarant 2',
  },
  {
    value: '',
    label: 'Prénom(s)',
    groupTitle: 'État civil - déclarant 2',
  },
  {
    value: '',
    label: 'Date de naissance',
    groupTitle: 'État civil - déclarant 2',
  },
  {
    value: 'dgfip_aft',
    label: 'Adresse déclarée au 1er Janvier',
    groupTitle: 'Adresse',
  },
  {
    value: 'dgfip_locaux_th',
    label: 'Données du local - identifiant du logement',
    groupTitle: 'Adresse',
  },
  {
    value: '',
    label: 'Données du local - nature (maison, appartement, etc.)',
    groupTitle: 'Adresse',
  },
  {
    value: '',
    label:
      'Données du local - régime de taxation (résidence principale uniquement)',
    groupTitle: 'Adresse',
  },
  {
    value: '',
    label: 'Données du local - affectation (« H » pour habitation)',
    groupTitle: 'Adresse',
  },
  {
    value: 'dgfip_sitfam',
    label: 'Situation de famille (marié, pacsé, célibataire, veuf divorcé)',
    groupTitle: 'Situation du foyer fiscal',
  },
  {
    value: 'dgfip_nbpart',
    label: 'Nombre de parts',
    groupTitle: 'Situation du foyer fiscal',
  },
  {
    value: '',
    label: 'Nombre total de personnes composant le foyer',
    groupTitle: 'Situation du foyer fiscal',
  },
  {
    value: 'dgfip_nbpac',
    label: 'Détail des personnes à charge et rattachées',
    groupTitle: 'Situation du foyer fiscal',
  },
  {
    value: '',
    label: 'Parent isolé (case T)',
    groupTitle: 'Situation du foyer fiscal',
  },
  {
    value: 'dgfip_rfr',
    label: 'Revenu fiscal de référence',
    groupTitle: 'Agrégats fiscaux',
  },
  {
    value: '',
    label: 'Montant de l’impôt sur les revenus soumis au barème (ligne 14)',
    groupTitle: 'Agrégats fiscaux',
  },
  {
    value: '',
    label: 'Indicateur de l’existence d’un déficit',
    groupTitle: 'Agrégats fiscaux',
  },
  {
    value: '',
    label: 'Indicateur ISF/IFI',
    groupTitle: 'Agrégats fiscaux',
  },
  {
    value: '',
    label: 'Catégorie 1 - Salaires, pensions, rentes',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 1 - Rentes viagères à titre onéreux',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 2 - Revenus de capitaux mobiliers',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 3 - Plus ou moins values',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 4 - Revenus fonciers',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 5 - Revenus des professions non salariées',
    groupTitle:
      'Revenus catégoriels - revenus déclarés (avant application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 1 - Salaires, pensions, rentes',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 1 - Rentes viagères à titre onéreux',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 2 - Revenus de capitaux mobiliers',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 3 - Plus ou moins values',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 4 - Revenus fonciers',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label: 'Catégorie 5 - Revenus des professions non salariées',
    groupTitle:
      'Revenus catégoriels - revenus nets (après application des abattements, etc...)',
  },
  {
    value: '',
    label:
      'Pensions alimentaires déductibles - Pension alimentaire versées à enfant majeur',
    groupTitle: 'Charges déductibles',
  },
  {
    value: '',
    label:
      'Pensions alimentaires déductibles - Autres pensions alimentaires versées (enfants mineurs, ascendants, ...)',
    groupTitle: 'Charges déductibles',
  },
  {
    value: '',
    label: 'Versement épargne retraite',
    groupTitle: 'Charges déductibles',
  },
];

export const CadreJuridiqueDescription = () => (
  <Quote>
    <p>
      Pour pouvoir bénéficier du raccordement à l’API Impôt particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Conformément au Code des relations entre le public et l’administration,
      l’échange de données s’impose aux administrations dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d’une demande présentée par
        un usager ;
      </li>
      <li>
        l’administration destinataire est habilitée à connaître ces données dans
        le cadre de ses missions. (Article L114-8 1er alinéa modifié par LOI
        n°2016-1321 du 7 octobre 2016 - art. 91 )
      </li>
    </ul>
  </Quote>
);

export const CguDescription = () => (
  <Quote>
    <p>
      Votre raccordement à l’API Impôt particulier nécessite l’acceptation des
      conditions générales d'utilisation.
    </p>
  </Quote>
);

export const SuiteDescription = () => (
  <Quote>
    <p>
      Après avoir cliqué sur « Soumettre la demande », les prochaines étapes
      sont :
    </p>
    <ol>
      <li>Le fournisseur de données de l’API va instruire la demande.</li>
      <li>
        En cours d’instruction, le fournisseur de données pourra vous demander
        par courriel des informations supplémentaires.
      </li>
      <li>
        Après instruction, vous serez informé par courriel de l’acceptation ou
        du refus de votre demande.
      </li>
    </ol>
    <p>En cas d’acceptation de votre demande :</p>
    <ul>
      <li>
        Le contact technique recevra par courriel les informations nécessaires
        pour accéder à l’environnement de test (bac à sable) de l’API.
      </li>
      <li>
        Vous recevrez par courriel un lien vers un deuxième formulaire à remplir
        afin d’accéder à l’environnement de production de l’API.
      </li>
    </ul>
  </Quote>
);

export const contacts = {
  technique: {
    heading: 'Responsable technique',
    description: (
      <p>
        Cette personne recevra les accès techniques par mail. Elle pourra
        également être contactée par téléphone pour faciliter le raccordement à
        l'API. Le responsable technique peut être le contact technique de votre
        prestataire.
      </p>
    ),
    family_name: '',
    given_name: '',
    email: '',
    phone_number: '',
  },
};
