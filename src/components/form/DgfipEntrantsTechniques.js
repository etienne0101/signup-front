import React from 'react';
import PropTypes from 'prop-types';
import DocumentUpload from './DocumentUpload';

const DgfipEntrantsTechniques = ({
  disabled,
  onChange,
  handleDocumentsChange,
  enrollment: {
    documents,
    documents_attributes,
    autorite_certification,
    ips_de_production,
    autorite_homologation_nom,
    autorite_homologation_fonction,
    date_homologation,
    date_fin_homologation,
    nombre_demandes_annuelle,
    pic_demandes_par_seconde,
    nombre_demandes_mensuelles_jan,
    nombre_demandes_mensuelles_fev,
    nombre_demandes_mensuelles_mar,
    nombre_demandes_mensuelles_avr,
    nombre_demandes_mensuelles_mai,
    nombre_demandes_mensuelles_jui,
    nombre_demandes_mensuelles_jul,
    nombre_demandes_mensuelles_aou,
    nombre_demandes_mensuelles_sep,
    nombre_demandes_mensuelles_oct,
    nombre_demandes_mensuelles_nov,
    nombre_demandes_mensuelles_dec,
    recette_fonctionnelle,
  },
}) => {
  const nombresDeDemandesMensuelles = [
    {
      label: 'Janvier',
      name: 'nombre_demandes_mensuelles_jan',
      value: nombre_demandes_mensuelles_jan,
    },
    {
      label: 'Février',
      name: 'nombre_demandes_mensuelles_fev',
      value: nombre_demandes_mensuelles_fev,
    },
    {
      label: 'Mars',
      name: 'nombre_demandes_mensuelles_mar',
      value: nombre_demandes_mensuelles_mar,
    },
    {
      label: 'Avril',
      name: 'nombre_demandes_mensuelles_avr',
      value: nombre_demandes_mensuelles_avr,
    },
    {
      label: 'Mai',
      name: 'nombre_demandes_mensuelles_mai',
      value: nombre_demandes_mensuelles_mai,
    },
    {
      label: 'Juin',
      name: 'nombre_demandes_mensuelles_jui',
      value: nombre_demandes_mensuelles_jui,
    },
    {
      label: 'Juillet',
      name: 'nombre_demandes_mensuelles_jul',
      value: nombre_demandes_mensuelles_jul,
    },
    {
      label: 'Août',
      name: 'nombre_demandes_mensuelles_aou',
      value: nombre_demandes_mensuelles_aou,
    },
    {
      label: 'Septembre',
      name: 'nombre_demandes_mensuelles_sep',
      value: nombre_demandes_mensuelles_sep,
    },
    {
      label: 'Octobre',
      name: 'nombre_demandes_mensuelles_oct',
      value: nombre_demandes_mensuelles_oct,
    },
    {
      label: 'Novembre',
      name: 'nombre_demandes_mensuelles_nov',
      value: nombre_demandes_mensuelles_nov,
    },
    {
      label: 'Décembre',
      name: 'nombre_demandes_mensuelles_dec',
      value: nombre_demandes_mensuelles_dec,
    },
  ];

  return (
    <React.Fragment>
      <h2 id="entrants-techniques">Entrants techniques</h2>
      <div className="information-text">
        <p>
          Afin de permettre la liaison technique entre votre SI et celui de la
          DGFiP, vous devez fournir les entrants techniques suivants :<br />{' '}
          adresse(s) IP du(-es) serveur(s) qui va(-ont) communiquer avec
          l&apos;API « Impôt Particulier »<br /> partie publique d’un certificat
          client RGS V2.0 en cours de validité avec son autorité de
          certification émettrice
        </p>
        <p>
          Afin de permettre votre mise en production dans les meilleures
          conditions possibles, veuillez vous assurer de la qualité de ces
          livrables techniques.
        </p>
      </div>
      <DocumentUpload
        disabled={disabled}
        uploadedDocuments={documents}
        documentsToUpload={documents_attributes}
        documentType={'Document::ProductionCertificatePublicKey'}
        handleDocumentsChange={handleDocumentsChange}
        label={'Certificat de production'}
      />
      <div className="form__group">
        <label htmlFor="autorite_certification">
          Autorité de certification
        </label>
        <input
          type="text"
          onChange={onChange}
          name="autorite_certification"
          id="autorite_certification"
          disabled={disabled}
          value={autorite_certification}
        />
      </div>
      <div className="form__group">
        <label htmlFor="ips_de_production">IPs de production</label>
        <input
          type="text"
          onChange={onChange}
          name="ips_de_production"
          id="ips_de_production"
          disabled={disabled}
          value={ips_de_production}
        />
      </div>

      <h2 id="homologation-securite">Homologation de sécurité</h2>
      <div className="information-text">
        <p>
          Le Référentiel Général de Sécurité (RGS 2.0) rend la démarche
          d’homologation obligatoire pour les SI relatifs aux échanges entre une
          autorité administrative et les usagers ou entre autorités
          administratives.
        </p>
        <p>
          Si vous l&apos;avez déjà fait, complétez les informations relatives à
          l&apos;homologation et déposez la décision formelle d’homologation
          (également appelée attestation formelle).
        </p>
        <p>
          Si vous ne l&apos;avez pas encore fait, envoyez-nous tout de même
          votre demande et nous vous aiderons à entamer cette démarche.
        </p>
      </div>
      <div className="form__group">
        <label htmlFor="autorite_homologation_nom">
          Nom de l&apos;autorité d&apos;homologation
        </label>
        <input
          type="text"
          onChange={onChange}
          name="autorite_homologation_nom"
          id="autorite_homologation_nom"
          disabled={disabled}
          value={autorite_homologation_nom}
        />
      </div>
      <div className="form__group">
        <label htmlFor="autorite_homologation_fonction">
          Fonction de l&apos;autorité d&apos;homologation
        </label>
        <input
          type="text"
          onChange={onChange}
          name="autorite_homologation_fonction"
          id="autorite_homologation_fonction"
          disabled={disabled}
          value={autorite_homologation_fonction}
        />
      </div>
      <div className="form__group">
        <label htmlFor="date_homologation">
          Date de début l&apos;homologation
        </label>
        <input
          type="date"
          onChange={onChange}
          name="date_homologation"
          id="date_homologation"
          disabled={disabled}
          value={date_homologation}
        />
      </div>
      <div className="form__group">
        <label htmlFor="date_fin_homologation">
          Date de fin de l&apos;homologation
        </label>
        <input
          type="date"
          onChange={onChange}
          name="date_fin_homologation"
          id="date_fin_homologation"
          disabled={disabled}
          value={date_fin_homologation}
        />
      </div>

      <h2 id="volumetrie">Volumétrie</h2>
      <div className="information-text">
        <p>
          Connaitre les données relatives à la volumétrie et à la saisonnalité
          de votre téléservice nous permettra de vous offrir la meilleure
          qualité de service possible. En effet, cela permettra de prévenir les
          pics de charges et de transmettre ces informations aux fournisseurs de
          vos données.
        </p>
        <p>
          Conformément à notre charte, nous nous réservons le droit de réduire
          ou couper les appels autorisés au fournisseur de service.
        </p>
      </div>
      <div className="form__group">
        <label htmlFor="nombre_demandes_annuelle">
          Quel est le volume global annuel des demandes de votre téléservice (en
          nombre de demandes par an)&nbsp;?
        </label>
        <input
          type="number"
          min="0"
          onChange={onChange}
          name="nombre_demandes_annuelle"
          id="nombre_demandes_annuelle"
          disabled={disabled}
          value={nombre_demandes_annuelle}
        />
      </div>
      <div className="form__group">
        <label htmlFor="pic_demandes_par_seconde">
          Quel est le pic de charge (en nombre de demandes par heure)&nbsp;?
        </label>
        <input
          type="number"
          min="0"
          onChange={onChange}
          name="pic_demandes_par_seconde"
          id="pic_demandes_par_seconde"
          disabled={disabled}
          value={pic_demandes_par_seconde}
        />
      </div>
      <div className="form__group">
        <label>
          Quel est la répartition de la charge (en nombre de demandes par mois,
          0 si le service est fermé)&nbsp;?
        </label>
        <div className="form__group">
          <div className="date_input_row">
            {nombresDeDemandesMensuelles.map(nombreDeDemendesMensuelles => (
              <div
                key={nombreDeDemendesMensuelles.name}
                className="date_input_col"
              >
                <label htmlFor={nombreDeDemendesMensuelles.name}>
                  {nombreDeDemendesMensuelles.label}
                </label>
                <input
                  type="number"
                  min="0"
                  onChange={onChange}
                  name={nombreDeDemendesMensuelles.name}
                  id={nombreDeDemendesMensuelles.name}
                  disabled={disabled}
                  value={nombreDeDemendesMensuelles.value}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 id="recette-fonctionnelle">Recette fonctionnelle</h2>
      <div className="information-text">
        <p>
          Afin d’assurer la qualification de votre applicatif, un générateur de
          bouchons est mis à votre disposition en suivant le lien ci-dessous. Il
          vous permettra de valoriser les données retournées par l&apos;API «
          Impôt Particulier » en fonction de vos besoins métier ou d’utiliser le
          jeu de données natif. Cette qualification est obligatoire tant pour
          votre homologation de sécurité ou vos obligations CNIL que pour
          demander l&apos;entrée en production auprès de la DGFiP.
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://fip1.integ01.dev-franceconnect.fr/user/create"
          >
            Accèder aux générateurs de bouchons
          </a>
        </p>
      </div>
      <div className="form__group">
        <input
          onChange={onChange}
          checked={recette_fonctionnelle}
          type="checkbox"
          name="recette_fonctionnelle"
          id="checkbox-recette_fonctionnelle"
          disabled={disabled}
        />
        <label
          htmlFor="checkbox-recette_fonctionnelle"
          className="label-inline"
        >
          J&apos;atteste avoir réalisé une recette fonctionnelle
        </label>
      </div>
      {!disabled && (
        <div className="notification form__group">
          <p>
            La demande d’entrée en production revêt un caractère définitif et
            entraîne le transfert de vos entrants techniques vers les
            exploitants informatiques de la DGFiP. Merci de vous assurer de la
            bonne valorisation de l&apos;ensemble des informations demandées
            avant de procéder à cette demande.
          </p>
          <p>
            Votre entrée en production se fera lors du premier créneau
            disponible à compter de l&apos;envoi des entrants technique de
            production et conformément au calendrier de nos disponibilités.
          </p>
          <p>Les périodes sans aucunes mise en prod sont :</p>
          <ul>
            <li>Fin mars -> Fin juin</li>
            <li>Aout -> Septembre</li>
            <li>Mi-décembre -> début janvier</li>
          </ul>
          <p>Les périodes tendues :</p>
          <ul>
            <li>Juillet</li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

DgfipEntrantsTechniques.propTypes = {
  enrollment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleDocumentsChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DgfipEntrantsTechniques;
