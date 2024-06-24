import { useState, useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Title } from 'components/Title';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import useApi from 'hooks/useApi';
import useUtils from 'hooks/useUtils';
import DemandelogementFollowPage from 'pages/demandelogement/followup';
import { Divider } from 'primereact/divider';
export default function ClientTempPage() {
	
	const [pageReady, setPageReady] = useState(true);
	const history = useNavigate();
const [isAgreed, setIsAgreed] = useState(false);
const { user } = useAuth();
const api = useApi();
const userId = user.id;
const utils = useUtils();
const [demandelogement, setDemandelogementState] = useState(utils.getDemandelogement());
const [nexturl, setNexturl]=useState(null);
const [demandeexists, setDemandeexists]=useState(null);

useEffect(() => {
    async function fetchInitialData() {
        try {
            const demandelogementresponse = await api.get(`/demandelogement/index/id_user/${userId}`);
            
                setDemandeexists(true);
                // Perform actions based on the response
                const encaissementresponse = await api.get(`/encaissement/last/${userId}`);
                const id_encaissement= encaissementresponse.data.id;
                const [DLfirstRecord] = demandelogementresponse.data.records;
                const { code_demande, nom, prenom, email_client, etat_demande, id } = DLfirstRecord;
                console.log('Initial data fetched successfully');
                console.log(etat_demande);
                console.log(id_encaissement);
                switch (etat_demande) {
                    case 'soumise': 
                        setNexturl(`/demandelogement/vuedemande/${id}`);
                        break;
                    case 'en attente FR': 
                        setNexturl(`/encaissement/proceedpayment/recid/${id_encaissement}`);
                        break;
                    case 'payment FR en attente': 
                        setNexturl('/index/paymentpending');
                        break;
                    case 'validee': 
                        setNexturl(`/demandelogement/continue/${id}`);
                        break;
                    case 'en attente FL': 
                        setNexturl(`/encaissement/proceedpayment/recid/${id_encaissement}`);
                        break;
                    case 'payment FL en attente': 
                        setNexturl('/index/paymentpending');
                        break;
                }
                
                setPageReady(true);
                console.log(nexturl);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchInitialData();
}, [userId]);


const redirectTo= ()=> {
    try {
        console.log(nexturl);
        history(nexturl);
    } catch (error) {
        console.error('Error redirecting ', error);
    }
    
}


const createDemandeLogement = () => {
    axios.post(`/demandelogement/newrentalrequest/${userId}`)
    .then(response => {
        if (response.data.success) {
            console.log('Demande logement creation successful', response.data);
            utils.setDemandelogement(response.data.id);
	  		setDemandelogementState(response.data.id);
            history(`/demandelogement/vuedemande/${response.data.id}`);
            } else {
            console.error('Failed to create demande logement', response.data.message);
        }
    })
    .catch(error => {
        console.error('Failed to redirect', error);
        if (error.response) {
            console.log('Error data:', error.response.data);
            console.log('Error status:', error.response.status);
        }
    });
};
const scrollablepanel = {
    overflowX: 'auto'  // Enables horizontal scrolling
  }
	return (
		<main id="ClientTempPage" className="main-page">
            <div className="col comp-grid" >
                <Title title={$t('Portail de demande de logement pour les clients')}   titleClass="text-5xl font-bold text-primary p-4" subTitleClass="text-500"   subTitle="Gérez vos demandes de logement en toute simplicité"   separator={false} />
            </div>
<p>
    <Panel header="Nouvelle Demande de réservation" toggleable collapsed='false'>
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title={$t('rservation')}   titleClass="text-5xl font-bold text-primary p-4" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
<section className="page-section mb-3" >
    <div className="container">
        <div className="grid ">
            <div className="col-10 comp-grid" >
                <div className="card  s">
                    <div>
                        <div className="wpb_wrapper">
                            <h3>1. Conditions d’hébergement dans nos résidences :</h3>
                            <div className="para">
                                <p>Une vie commune dans une résidence pour étudiants est tributaire d’un respect mutuel de l’entourage, de la vie individuelle et collective, et également de l’administration gérante et la sauvegarde des équipements et infrastructures mis à la disposition des résidents. C’est à ce titre que nos résidences sont dotées d’un règlement intérieur garantissant les bonnes conditions d’une vie en communauté.</p>
                                <p>L’hébergement à Bayt Al Maârifa est destiné aux étudiants et chercheurs marocains ou étrangers. L’admission en priorité est prononcée par un comité interne, sur la base d’un dossier de réservation présenté par le postulant, elle est valable pour une année universitaire.</p>
                                <p>Par ailleurs, la résidence est ouverte, également, aux étudiants et chercheurs, marocains ou étrangers, pendant les mois de juillet et août, pour leur permettre de suivre des stages, des cours de langues, passer des concours …</p>
                            </div>
                            <h3>2. Modalités d’inscription et réservation :</h3>
                            <div className="para">
                                <p>DYAR AL MADINA a mis une nouvelle procédure de réservation de chambres à compter du 1er juillet 2014. Cette procédure vise à faciliter l’accès à ses résidences BAYT AL MAARIFA de façon simple en respectant la priorité de dépôt des demandes des postulants et en améliorant le temps de réponse, de ce fait elle devient un passage nécessaire pour le traitement de toute nouvelle demande. Les demandes d’hébergement sont étudiées par une commission interne, tenant compte notamment du critère de fidélisation de nos clients et de la disponibilité.</p>
                                <p>Afin de permettre à la commission d’étudier la demande, l’inscrit doit obligatoirement procéder au virement des frais de traitement sur le compte bancaire de DYAR AL MADINA, selon la résidence choisie :</p>
                                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '15px', textAlign: 'left', boxShadow: '0 2px 3px rgba(0,0,0,0.1)' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#009879', color: '#ffffff', textAlign: 'left', fontWeight: 'bold' }}>
                                            <th style={{ padding: '12px 15px' }}>Résidence BAM choisie</th>
                                            <th style={{ padding: '12px 15px' }}>Montant en dh</th>
                                            <th style={{ padding: '12px 15px' }}><strong>Banque</strong></th>
                                            <th style={{ padding: '12px 15px' }}><strong>RIB</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #dddddd' }}>
                                            <td style={{ padding: '12px 15px' }}><strong>RABAT</strong></td>
                                            <td style={{ padding: '12px 15px' }}>700</td>
                                            <td style={{ padding: '12px 15px' }}>Crédit du Maroc</td>
                                            <td style={{ padding: '12px 15px' }}>021 780 00000 270 300 63891 81</td>
                                        </tr>
                                        <tr style={{ backgroundColor: '#f3f3f3', borderBottom: '1px solid #dddddd' }}>
                                            <td style={{ padding: '12px 15px' }}><strong>CASABLANCA</strong></td>
                                            <td style={{ padding: '12px 15px' }}>700</td>
                                            <td style={{ padding: '12px 15px' }}>Crédit du Maroc</td>
                                            <td style={{ padding: '12px 15px' }}>021 780 00000 270 300 63925 76</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #dddddd' }}>
                                            <td style={{ padding: '12px 15px' }}><strong>MEKNES</strong></td>
                                            <td style={{ padding: '12px 15px' }}>350</td>
                                            <td style={{ padding: '12px 15px' }}>Crédit du Maroc</td>
                                            <td style={{ padding: '12px 15px' }}>021 780 00000 270 300 62647 30</td>
                                        </tr>
                                        <tr style={{ backgroundColor: '#f3f3f3', borderBottom: '2px solid #009879' }}>
                                            <td style={{ padding: '12px 15px' }}><strong>EL JADIDA</strong></td>
                                            <td style={{ padding: '12px 15px' }}>350</td>
                                            <td style={{ padding: '12px 15px' }}>Crédit du Maroc</td>
                                            <td style={{ padding: '12px 15px' }}>021 780 00000 270 300 62639 54</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>-Ces frais sont non remboursables quelque soit le résultat réservé à la demande (acceptée ou rejetée).</p>
                                <p>-Les demandes sont traitées en fonction des chambres immédiatement disponibles ou celles qui seront libérées.</p>
                                <p>** Pour tout complément information,veuillez se reférer au contact. Une fois le versement fait gardez le reçu bancaire car son numéro vous sera demandé par le formulaire de réservation ci-bas (Voir bouton<strong> RESERVER </strong>) ainsi que les autres informations suivantes : Nom, Prénom, Résidence Souhaité, CIN, Email, GSM, École, Niveau d’étude et Choix d’hébergement (Choix 1, Choix 2 et Choix 3).</p>
                                <p>Une fois vous cliquez sur le bouton <strong>RESERVER</strong> , les étapes à venir sont les suivantes :</p>
                                <ol type="A">
                                    <li>Remplissez attentivement le formulaire d’inscription (si vous êtes nouveau sur le site), en veillant à renseigner l’ensemble des rubriques,</li>
                                    <li>Un mail de confirmation du compte vous parviendra sur votre adresse mail que vous avez spécifié,</li>
                                    <li>Une fois vous confirmez votre inscription:</li>
                                    <li>veuillez-vous connecter avec votre compte email et mot de passe (déjà spécifiés au moment de l’inscription&nbsp;;</li>
                                    <li>veuillez-vous pointer sur la rubrique «&nbsp;réservation&nbsp;»;</li>
                                    <li>Remplissez le formulaire de réservation, en veillant à renseigner l’ensemble des rubriques dont notamment le reçu de versement (NB&nbsp;:vous pouvez consulter vos réservations dans votre espace membre)&nbsp;;</li>
                                    <li>A compter du 11 aout, une réponse à votre demande vous parviendra sur votre adresse mail, les résultats des travaux de la commission seront également publiés sur notre site web</li>
                                    <li>En cas d’acceptation de votre demande de réservation, vous serez invités à compléter votre dossier d’inscription et à payer les frais et redevances du type d’hébergement choisi,</li>
                                    <li>Se présenter à la résidence pour réaliser l’opération de chek-in et de réception des clés.</li>
                                </ol>
                                <ul className="style2">
                                    <li>Le justificatif&nbsp; de <strong>versement ou virement </strong>&nbsp;d’inscription Internet,</li>
                                    <li>Demande de logement (modèle à télécharger) avec 2 photos d’identité,</li>
                                    <li>une photocopie de la CNI <strong>ou</strong> 3 premières pages du passeport pour les étrangers,</li>
                                    <li>Un justificatif d’inscription aux études universitaires dans un établissement public/privé&nbsp;<strong>ou</strong> attestation de dépôt de dossier d’inscription <strong>ou</strong> carte d’étudiant <strong>ou </strong>attestation de stage</li>
                                    <li>Engagement du garant signé et légalisé par le garant,</li>
                                    <li>Règlement intérieur signé et légalisé par l’étudiant,</li>
                                    <li>Un certificat médical de l’étudiant attestant l’absence de maladies contagieuses,</li>
                                    <li>Une attestation de relevé d’identité bancaire (RIB) ou spécimen de chèque,</li>
                                    <li>Règlement intérieur signée par le résident (modèle à télécharger)</li>
                                    <li><strong>Pour les personnes à mobilité réduite</strong>: une attestation d’invalidité</li>
                                    <li>REGLEMENT INTERIEUR…………..&nbsp;<a href="https://web.archive.org/web/20240228173524/https://baytalmaarifa.ma/wp-content/uploads/2023/06/02-REGLEMENT-INTERIEUR-2023-2024.pdf" target="_blank" rel="noopener noreferrer"><img decoding="async" className="alignnone" src="https://web.archive.org/web/20240228173524im_/https://baytalmaarifa.ma/wp-content/uploads/2020/09/pdf.jpg" alt="" width="17" height="19" border="0"/></a> <span className="Style1">Fichier à télécharger en PDF</span></li>
                                    <li>ENGAGEMENT DU GARANT…….&nbsp;<a href="https://web.archive.org/web/20240228173524/https://baytalmaarifa.ma/wp-content/uploads/2023/06/07-Engagement-garant-2023-2024.pdf" target="_blank" rel="noopener noreferrer"><img decoding="async" className="alignnone" src="https://web.archive.org/web/20240228173524im_/https://baytalmaarifa.ma/wp-content/uploads/2020/09/pdf.jpg" alt="" width="17" height="19" border="0"/></a> <span className="Style1">Fichier à télécharger en PDF</span></li>
                                    <li>DEMANDE DE LOGEMENT………&nbsp;<a href="https://web.archive.org/web/20240228173524/https://baytalmaarifa.ma/wp-content/uploads/2023/06/06-Demande-logement-2023-2024.pdf" target="_blank" rel="noopener noreferrer"><img decoding="async" className="alignnone" src="https://web.archive.org/web/20240228173524im_/https://baytalmaarifa.ma/wp-content/uploads/2020/09/pdf.jpg" alt="" width="17" height="19" border="0"/></a> <span className="Style1">Fichier à télécharger en PDF</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="checkbox-wrapper">
                            <input 
                            type="checkbox" 
                            id="agreement" 
                            checked={isAgreed} 
                            onChange={(e) => setIsAgreed(e.target.checked)} 
                            />
                            <label htmlFor="agreement">J'accepte les termes et conditions</label>
                        </div>
                        <Button
                        icon="pi pi-check-circle"
                        label="Lancer une nouvelle demande de logement"
                        className="p-button-outlined p-button-primary"
                        onClick={createDemandeLogement}
                        disabled={!isAgreed}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</Panel>
<hr/>
<Panel header="Demandes en cours"  toggleable collapsed='false'>
<div style={{ overflowX: 'auto', width: '100%' }}>
    <DemandelogementFollowPage isSubPage showHeader='false' /> 
    </div>
</Panel>
</p>
<Divider layout="vertical" />
<p>
<Button type="button" label="Continuer la demande de logement en cours" icon="pi pi-users" outlined badge="1" onClick={redirectTo} badgeClassName="p-badge-danger" />

</p>
		</main>
	);
}
