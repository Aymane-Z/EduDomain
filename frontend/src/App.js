import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import 'primereact/resources/themes/saga-blue/theme.css';
//import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './styles/theme/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./styles/layout/layout.scss";
import "./styles/demo/Demos.scss";
import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import AuthRoutes from 'components/AuthRoutes';
import IndexPage from 'pages/index/IndexPage';
import LoginPage from 'pages/index/login';
import ApplogsList from 'pages/applogs/List';
import ApplogsView from 'pages/applogs/View';
import BasetarificationList from 'pages/basetarification/List';
import BasetarificationView from 'pages/basetarification/View';
import BasetarificationAdd from 'pages/basetarification/Add';
import BasetarificationEdit from 'pages/basetarification/Edit';
import BatimentList from 'pages/batiment/List';
import BatimentView from 'pages/batiment/View';
import BatimentAdd from 'pages/batiment/Add';
import BatimentEdit from 'pages/batiment/Edit';
import BatimentdetailsList from 'pages/batimentdetails/List';
import ChambreList from 'pages/chambre/List';
import ChambreView from 'pages/chambre/View';
import ChambreAdd from 'pages/chambre/Add';
import ChambreEdit from 'pages/chambre/Edit';
import ChambredetailsList from 'pages/chambredetails/List';
import ClientList from 'pages/client/List';
import ClientView from 'pages/client/View';
import ClientAdd from 'pages/client/Add';
import ClientEdit from 'pages/client/Edit';
import ContratList from 'pages/contrat/List';
import ContratView from 'pages/contrat/View';
import ContratAdd from 'pages/contrat/Add';
import ContratEdit from 'pages/contrat/Edit';
import CouloirList from 'pages/couloir/List';
import CouloirView from 'pages/couloir/View';
import CouloirAdd from 'pages/couloir/Add';
import CouloirEdit from 'pages/couloir/Edit';
import CouloirdetailsList from 'pages/couloirdetails/List';
import DemandelogementList from 'pages/demandelogement/List';
import DemandelogementFollow from 'pages/demandelogement/followup';
import DemandelogementView from 'pages/demandelogement/View';
import DemandelogementSuivi from 'pages/demandelogement/Suivi';
import DemandelogementAdd from 'pages/demandelogement/Add';
import DemandelogementEdit from 'pages/demandelogement/Edit';
import DemandelogementVuedemande from 'pages/demandelogement/Vuedemande';
import DemandelogementContinuePage from 'pages/demandelogement/continue';
import DossierlocationList from 'pages/dossierlocation/List';
import DossierlocationView from 'pages/dossierlocation/View';
import DossierlocationAdd from 'pages/dossierlocation/Add';
import DossierlocationEdit from 'pages/dossierlocation/Edit';
import EncaissementList from 'pages/encaissement/List';
import EncaissementExternesPage from 'pages/encaissement/Externes';
import EncaissementView from 'pages/encaissement/View';
import EncaissementAdd from 'pages/encaissement/Add';
import EncaissementEdit from 'pages/encaissement/Edit';
import EncaissementPaiement from 'pages/encaissement/Paiement';
import EncaissementPaiementdetails from 'pages/encaissement/Paiementdetails';
import EncaissementProceedPage from 'pages/encaissement/ProceedPayment'
import EncaissementexterneList from 'pages/encaissementexterne/List';
import EncaissementexterneView from 'pages/encaissementexterne/View';
import EncaissementexterneAdd from 'pages/encaissementexterne/Add';
import EncaissementexterneEdit from 'pages/encaissementexterne/Edit';
import EncaissementdetailsList from 'pages/encaissementdetails/List';
import EquipementList from 'pages/equipement/List';
import EquipementView from 'pages/equipement/View';
import EquipementAdd from 'pages/equipement/Add';
import EquipementEdit from 'pages/equipement/Edit';
import EtageList from 'pages/etage/List';
import EtageView from 'pages/etage/View';
import EtageAdd from 'pages/etage/Add';
import EtageEdit from 'pages/etage/Edit';
import EtatuniteList from 'pages/etatunite/List';
import EtatuniteView from 'pages/etatunite/View';
import EtatuniteAdd from 'pages/etatunite/Add';
import EtatuniteEdit from 'pages/etatunite/Edit';
import FacturationList from 'pages/facturation/List';
import FacturationView from 'pages/facturation/View';
import FacturationAdd from 'pages/facturation/Add';
import FacturationEdit from 'pages/facturation/Edit';
import FactureList from 'pages/facture/List';
import FactureView from 'pages/facture/View';
import FactureAdd from 'pages/facture/Add';
import FactureEdit from 'pages/facture/Edit';
import FamilleequipementList from 'pages/familleequipement/List';
import FamilleequipementView from 'pages/familleequipement/View';
import FamilleequipementAdd from 'pages/familleequipement/Add';
import FamilleequipementEdit from 'pages/familleequipement/Edit';
import FamilleuniteList from 'pages/familleunite/List';
import FamilleuniteView from 'pages/familleunite/View';
import FamilleuniteAdd from 'pages/familleunite/Add';
import FamilleuniteEdit from 'pages/familleunite/Edit';
import FreerentalunitsList from 'pages/freerentalunits/List';
import GarantList from 'pages/garant/List';
import GarantView from 'pages/garant/View';
import GarantAdd from 'pages/garant/Add';
import GarantEdit from 'pages/garant/Edit';
import GarantieList from 'pages/garantie/List';
import GarantieView from 'pages/garantie/View';
import GarantieAdd from 'pages/garantie/Add';
import GarantieEdit from 'pages/garantie/Edit';
import InfoscompdemandeList from 'pages/infoscompdemande/List';
import InfoscompdemandeView from 'pages/infoscompdemande/View';
import InfoscompdemandeAdd from 'pages/infoscompdemande/Add';
import InfoscompdemandeEdit from 'pages/infoscompdemande/Edit';
import InfoscompdemandeContinuePage from 'pages/infoscompdemande/continue';
import LecturedesindexList from 'pages/lecturedesindex/List';
import LecturedesindexView from 'pages/lecturedesindex/View';
import LecturedesindexAdd from 'pages/lecturedesindex/Add';
import LecturedesindexEdit from 'pages/lecturedesindex/Edit';
import LignesfactureList from 'pages/lignesfacture/List';
import LignesfactureView from 'pages/lignesfacture/View';
import LignesfactureAdd from 'pages/lignesfacture/Add';
import LignesfactureEdit from 'pages/lignesfacture/Edit';
import ListmenusList from 'pages/listmenus/List';
import ListmenusView from 'pages/listmenus/View';
import ListmenusAdd from 'pages/listmenus/Add';
import ListmenusEdit from 'pages/listmenus/Edit';
import ListmenusPersonnel from 'pages/listmenus/Personnel';
import ListmenusPatrimoine from 'pages/listmenus/Patrimoine';
import ListmenusClients from 'pages/listmenus/Clients';
import ListmenusDossierslocation from 'pages/listmenus/Dossierslocation';
import ListmenusGestionreclamations from 'pages/listmenus/Gestionreclamations';
import ListmenusDemandeslogement from 'pages/listmenus/Demandeslogement';
import ListmenusEspaceclient from 'pages/listmenus/Espaceclient';
import ListmenusGestioncompteurs from 'pages/listmenus/Gestioncompteurs';
import PavillonList from 'pages/pavillon/List';
import PavillonView from 'pages/pavillon/View';
import PavillonAdd from 'pages/pavillon/Add';
import PavillonEdit from 'pages/pavillon/Edit';
import PavillondetailsList from 'pages/pavillondetails/List';
import PermissionsnodeList from 'pages/permissionsnode/List';
import PermissionsnodeView from 'pages/permissionsnode/View';
import PermissionsnodeAdd from 'pages/permissionsnode/Add';
import PermissionsnodeEdit from 'pages/permissionsnode/Edit';
import PermissionsnodeAssign from 'pages/permissionsnode/Assign';
import ProprietaireList from 'pages/proprietaire/List';
import ProprietaireView from 'pages/proprietaire/View';
import ProprietaireAdd from 'pages/proprietaire/Add';
import ProprietaireEdit from 'pages/proprietaire/Edit';
import ReclamationList from 'pages/reclamation/List';
import ReclamationView from 'pages/reclamation/View';
import ReclamationAdd from 'pages/reclamation/Add';
import ReclamationEdit from 'pages/reclamation/Edit';
import ReclamationTraitement from 'pages/reclamation/Traitement';
import ReclamationResolue from 'pages/reclamation/Resolue';
import ResidenceList from 'pages/residence/List';
import ResidenceView from 'pages/residence/View';
import ResidenceAdd from 'pages/residence/Add';
import ResidenceEdit from 'pages/residence/Edit';
import ResponsableList from 'pages/responsable/List';
import ResponsableView from 'pages/responsable/View';
import ResponsableAdd from 'pages/responsable/Add';
import ResponsableEdit from 'pages/responsable/Edit';
import RolesList from 'pages/roles/List';
import RolesView from 'pages/roles/View';
import RolesAdd from 'pages/roles/Add';
import RolesEdit from 'pages/roles/Edit';
import TarificationList from 'pages/tarification/List';
import TarificationView from 'pages/tarification/View';
import TarificationAdd from 'pages/tarification/Add';
import TarificationEdit from 'pages/tarification/Edit';
import UnitelocationList from 'pages/unitelocation/List';
import UnitelocationView from 'pages/unitelocation/View';
import UnitelocationAdd from 'pages/unitelocation/Add';
import UnitelocationEdit from 'pages/unitelocation/Edit';
import UnitelocationFreeunits from 'pages/unitelocation/Freeunits';
import UnitelocationdetailsList from 'pages/unitelocationdetails/List';
import UnitelocationdetailsFreeunits from 'pages/unitelocationdetails/Freeunits';
import UsersnodeList from 'pages/usersnode/List';
import UsersnodeView from 'pages/usersnode/View';
import UsersnodeAdd from 'pages/usersnode/Add';
import UsersnodeEdit from 'pages/usersnode/Edit';
import ClientTempPage from 'pages/home/ClientTempPage';
import AccountPages from 'pages/account';
import HomePage from './pages/home/HomePage';
import WelcomePage from './pages/home/welcome';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import PaymentSuccess from './pages/index/PaymentSuccess';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
import { lazy, Suspense } from 'react';

const ForgotPasswordPage = lazy(() => {
    console.log("Loading ForgotPasswordPage...");
    return import('pages/index/ForgotPassword');
});

const ResetPasswordPage = lazy(() => {
    console.log("Loading ResetPasswordPage...");
    return import('pages/index/ResetPassword');
});

const ResetPasswordCompletedPage = lazy(() => {
    console.log("Loading ResetPasswordCompletedPage...");
    return import('pages/index/ResetPasswordCompleted');
});

const RegisterPage = lazy(() => {
    console.log("Loading RegisterPage...");
    return import('pages/index/RegisterPage');
});

const VerifyEmailPage = lazy(() => {
    console.log("Loading VerifyEmailPage...");
    return import('pages/index/VerifyEmail');
});

const EmailVerifiedPage = lazy(() => {
    console.log("Loading EmailVerifiedPage...");
    return import('pages/index/EmailVerified');
});

const PaymentPendingPage = lazy(() => {
    console.log("Loading PaymentPendingPage...");
    return import('pages/index/PaymentPending');
});

const StripecheckoutPage = lazy(() => {
    console.log("Loading stripepage...");
    return import('pages/index/stripecheckout');
});
const App = () => {
	const auth = useAuth();
	function DefaultPage(){
		if(!auth.isLoggedIn){
			return <LoginPage />
		}
		return <Navigate to="/home" replace />;
	}
	function UserRoleHomePage(){
		const userRole = (auth.userRole || '').toLowerCase();
		switch(userRole){
			case 'client_temp':
				return <WelcomePage />
			default:
				return <HomePage />;
		}
	}
	return (
		<Routes>
			<Route path="/index/register" element={<RegisterPage />} />
        	<Route path="/index/forgotpassword" element={<ForgotPasswordPage />} />
        	<Route path="/index/resetpassword" element={<ResetPasswordPage />} />
        	<Route path="/index/resetpassword_completed" element={<ResetPasswordCompletedPage />} />
        	<Route path="/index/verifyemail" element={<VerifyEmailPage />} />
        	<Route path="/index/emailverified" element={<EmailVerifiedPage />} />
			<Route path="/index/stripecheckout" element={<StripecheckoutPage />} />
			<Route path="/index/paymentpending" element={<PaymentPendingPage />} />
			<Route path="/index/paymentsuccess" element={<PaymentSuccess />} />

			<Route exact element={<AuthRoutes />}>
			<Route element={<MainLayout />}>
				<Route path="/home" element={<UserRoleHomePage />} />
				<Route path="/home/reservation" element={<ClientTempPage />} />

				{/* applogs pages routes */}
				<Route path="/applogs" element={<ApplogsList />} />
				<Route path="/applogs/:fieldName/:fieldValue" element={<ApplogsList />} />
				<Route path="/applogs/index/:fieldName/:fieldValue" element={<ApplogsList />} />
				<Route path="/applogs/view/:pageid" element={<ApplogsView />} />

				{/* basetarification pages routes */}
				<Route path="/basetarification" element={<BasetarificationList />} />
				<Route path="/basetarification/:fieldName/:fieldValue" element={<BasetarificationList />} />
				<Route path="/basetarification/index/:fieldName/:fieldValue" element={<BasetarificationList />} />
				<Route path="/basetarification/view/:pageid" element={<BasetarificationView />} />
				<Route path="/basetarification/add" element={<BasetarificationAdd />} />
				<Route path="/basetarification/edit/:pageid" element={<BasetarificationEdit />} />

				{/* batiment pages routes */}
				<Route path="/batiment" element={<BatimentList />} />
				<Route path="/batiment/:fieldName/:fieldValue" element={<BatimentList />} />
				<Route path="/batiment/index/:fieldName/:fieldValue" element={<BatimentList />} />
				<Route path="/batiment/view/:pageid" element={<BatimentView />} />
				<Route path="/batiment/add" element={<BatimentAdd />} />
				<Route path="/batiment/edit/:pageid" element={<BatimentEdit />} />

				{/* batimentdetails pages routes */}
				<Route path="/batimentdetails" element={<BatimentdetailsList />} />
				<Route path="/batimentdetails/:fieldName/:fieldValue" element={<BatimentdetailsList />} />
				<Route path="/batimentdetails/index/:fieldName/:fieldValue" element={<BatimentdetailsList />} />

				{/* chambre pages routes */}
				<Route path="/chambre" element={<ChambreList />} />
				<Route path="/chambre/:fieldName/:fieldValue" element={<ChambreList />} />
				<Route path="/chambre/index/:fieldName/:fieldValue" element={<ChambreList />} />
				<Route path="/chambre/view/:pageid" element={<ChambreView />} />
				<Route path="/chambre/add" element={<ChambreAdd />} />
				<Route path="/chambre/edit/:pageid" element={<ChambreEdit />} />

				{/* chambredetails pages routes */}
				<Route path="/chambredetails" element={<ChambredetailsList />} />
				<Route path="/chambredetails/:fieldName/:fieldValue" element={<ChambredetailsList />} />
				<Route path="/chambredetails/index/:fieldName/:fieldValue" element={<ChambredetailsList />} />

				{/* client pages routes */}
				<Route path="/client" element={<ClientList />} />
				<Route path="/client/:fieldName/:fieldValue" element={<ClientList />} />
				<Route path="/client/index/:fieldName/:fieldValue" element={<ClientList />} />
				<Route path="/client/view/:pageid" element={<ClientView />} />
				<Route path="/client/add" element={<ClientAdd />} />
				<Route path="/client/edit/:pageid" element={<ClientEdit />} />

				{/* contrat pages routes */}
				<Route path="/contrat" element={<ContratList />} />
				<Route path="/contrat/:fieldName/:fieldValue" element={<ContratList />} />
				<Route path="/contrat/index/:fieldName/:fieldValue" element={<ContratList />} />
				<Route path="/contrat/view/:pageid" element={<ContratView />} />
				<Route path="/contrat/add" element={<ContratAdd />} />
				<Route path="/contrat/edit/:pageid" element={<ContratEdit />} />

				{/* couloir pages routes */}
				<Route path="/couloir" element={<CouloirList />} />
				<Route path="/couloir/:fieldName/:fieldValue" element={<CouloirList />} />
				<Route path="/couloir/index/:fieldName/:fieldValue" element={<CouloirList />} />
				<Route path="/couloir/view/:pageid" element={<CouloirView />} />
				<Route path="/couloir/add" element={<CouloirAdd />} />
				<Route path="/couloir/edit/:pageid" element={<CouloirEdit />} />

				{/* couloirdetails pages routes */}
				<Route path="/couloirdetails" element={<CouloirdetailsList />} />
				<Route path="/couloirdetails/:fieldName/:fieldValue" element={<CouloirdetailsList />} />
				<Route path="/couloirdetails/index/:fieldName/:fieldValue" element={<CouloirdetailsList />} />

				{/* demandelogement pages routes */}
				<Route path="/demandelogement" element={<DemandelogementList />} />
				<Route path="/demandelogement/follow" element={<DemandelogementFollow />} />
				<Route path="/demandelogement/:fieldName/:fieldValue" element={<DemandelogementList />} />
				<Route path="/demandelogement/index/:fieldName/:fieldValue" element={<DemandelogementList />} />
				<Route path="/demandelogement/follow/:fieldName/:fieldValue" element={<DemandelogementFollow />} />
				<Route path="/demandelogement/view/:pageid" element={<DemandelogementView />} />
				<Route path="/demandelogement/suivi/:pageid" element={<DemandelogementSuivi />} />
				<Route path="/demandelogement/add" element={<DemandelogementAdd />} />
				<Route path="/demandelogement/edit/:pageid" element={<DemandelogementEdit />} />
				<Route path="/demandelogement/continue/:pageid" element={<DemandelogementContinuePage />} />
				<Route path="/demandelogement/vuedemande/:pageid" element={<DemandelogementVuedemande />} />

				{/* dossierlocation pages routes */}
				<Route path="/dossierlocation" element={<DossierlocationList />} />
				<Route path="/dossierlocation/:fieldName/:fieldValue" element={<DossierlocationList />} />
				<Route path="/dossierlocation/index/:fieldName/:fieldValue" element={<DossierlocationList />} />
				<Route path="/dossierlocation/view/:pageid" element={<DossierlocationView />} />
				<Route path="/dossierlocation/add" element={<DossierlocationAdd />} />
				<Route path="/dossierlocation/edit/:pageid" element={<DossierlocationEdit />} />

				{/* encaissement pages routes */}
				<Route path="/encaissement" element={<EncaissementList />} />
				<Route path="/encaissement/:fieldName/:fieldValue" element={<EncaissementList />} />
				<Route path="/encaissement/index/:fieldName/:fieldValue" element={<EncaissementList />} />
				<Route path="/encaissement/externes" element={<EncaissementExternesPage />} />
				<Route path="/encaissement/view/:pageid" element={<EncaissementView />} />
				<Route path="/encaissement/add" element={<EncaissementAdd />} />
				<Route path="/encaissement/edit/:pageid" element={<EncaissementEdit />} />
				<Route path="/encaissement/paiement/:pageid" element={<EncaissementPaiement />} />
				<Route path="/encaissement/paiementdetails" element={<EncaissementPaiementdetails />} />
				<Route path="/encaissement/proceedpayment/:fieldName/:fieldValue" element={<EncaissementProceedPage />} />
				<Route path="/encaissement/paiementdetails/:fieldName/:fieldValue" element={<EncaissementPaiementdetails />} />

				{/* encaissementexterne pages routes */}
				<Route path="/encaissementexterne" element={<EncaissementexterneList />} />
				<Route path="/encaissementexterne/:fieldName/:fieldValue" element={<EncaissementexterneList />} />
				<Route path="/encaissementexterne/index/:fieldName/:fieldValue" element={<EncaissementexterneList />} />
				<Route path="/encaissementexterne/view/:pageid" element={<EncaissementexterneView />} />
				<Route path="/encaissementexterne/add" element={<EncaissementexterneAdd />} />
				<Route path="/encaissementexterne/edit/:pageid" element={<EncaissementexterneEdit />} />

				<Route path="/encaissementdetails" element={<EncaissementdetailsList />} />
				<Route path="/encaissementdetails/:fieldName/:fieldValue" element={<EncaissementdetailsList />} />
				<Route path="/encaissementdetails/index/:fieldName/:fieldValue" element={<EncaissementdetailsList />} />

				{/* equipement pages routes */}
				<Route path="/equipement" element={<EquipementList />} />
				<Route path="/equipement/:fieldName/:fieldValue" element={<EquipementList />} />
				<Route path="/equipement/index/:fieldName/:fieldValue" element={<EquipementList />} />
				<Route path="/equipement/view/:pageid" element={<EquipementView />} />
				<Route path="/equipement/add" element={<EquipementAdd />} />
				<Route path="/equipement/edit/:pageid" element={<EquipementEdit />} />

				{/* etage pages routes */}
				<Route path="/etage" element={<EtageList />} />
				<Route path="/etage/:fieldName/:fieldValue" element={<EtageList />} />
				<Route path="/etage/index/:fieldName/:fieldValue" element={<EtageList />} />
				<Route path="/etage/view/:pageid" element={<EtageView />} />
				<Route path="/etage/add" element={<EtageAdd />} />
				<Route path="/etage/edit/:pageid" element={<EtageEdit />} />

				{/* etatunite pages routes */}
				<Route path="/etatunite" element={<EtatuniteList />} />
				<Route path="/etatunite/:fieldName/:fieldValue" element={<EtatuniteList />} />
				<Route path="/etatunite/index/:fieldName/:fieldValue" element={<EtatuniteList />} />
				<Route path="/etatunite/view/:pageid" element={<EtatuniteView />} />
				<Route path="/etatunite/add" element={<EtatuniteAdd />} />
				<Route path="/etatunite/edit/:pageid" element={<EtatuniteEdit />} />

				{/* facturation pages routes */}
				<Route path="/facturation" element={<FacturationList />} />
				<Route path="/facturation/:fieldName/:fieldValue" element={<FacturationList />} />
				<Route path="/facturation/index/:fieldName/:fieldValue" element={<FacturationList />} />
				<Route path="/facturation/view/:pageid" element={<FacturationView />} />
				<Route path="/facturation/add" element={<FacturationAdd />} />
				<Route path="/facturation/edit/:pageid" element={<FacturationEdit />} />

				{/* facture pages routes */}
				<Route path="/facture" element={<FactureList />} />
				<Route path="/facture/:fieldName/:fieldValue" element={<FactureList />} />
				<Route path="/facture/index/:fieldName/:fieldValue" element={<FactureList />} />
				<Route path="/facture/view/:pageid" element={<FactureView />} />
				<Route path="/facture/add" element={<FactureAdd />} />
				<Route path="/facture/edit/:pageid" element={<FactureEdit />} />

				{/* familleequipement pages routes */}
				<Route path="/familleequipement" element={<FamilleequipementList />} />
				<Route path="/familleequipement/:fieldName/:fieldValue" element={<FamilleequipementList />} />
				<Route path="/familleequipement/index/:fieldName/:fieldValue" element={<FamilleequipementList />} />
				<Route path="/familleequipement/view/:pageid" element={<FamilleequipementView />} />
				<Route path="/familleequipement/add" element={<FamilleequipementAdd />} />
				<Route path="/familleequipement/edit/:pageid" element={<FamilleequipementEdit />} />

				{/* familleunite pages routes */}
				<Route path="/familleunite" element={<FamilleuniteList />} />
				<Route path="/familleunite/:fieldName/:fieldValue" element={<FamilleuniteList />} />
				<Route path="/familleunite/index/:fieldName/:fieldValue" element={<FamilleuniteList />} />
				<Route path="/familleunite/view/:pageid" element={<FamilleuniteView />} />
				<Route path="/familleunite/add" element={<FamilleuniteAdd />} />
				<Route path="/familleunite/edit/:pageid" element={<FamilleuniteEdit />} />

				{/* freerentalunits pages routes */}
				<Route path="/freerentalunits" element={<FreerentalunitsList />} />
				<Route path="/freerentalunits/:fieldName/:fieldValue" element={<FreerentalunitsList />} />
				<Route path="/freerentalunits/index/:fieldName/:fieldValue" element={<FreerentalunitsList />} />

				{/* garant pages routes */}
				<Route path="/garant" element={<GarantList />} />
				<Route path="/garant/:fieldName/:fieldValue" element={<GarantList />} />
				<Route path="/garant/index/:fieldName/:fieldValue" element={<GarantList />} />
				<Route path="/garant/view/:pageid" element={<GarantView />} />
				<Route path="/garant/add" element={<GarantAdd />} />
				<Route path="/garant/edit/:pageid" element={<GarantEdit />} />

				{/* garantie pages routes */}
				<Route path="/garantie" element={<GarantieList />} />
				<Route path="/garantie/:fieldName/:fieldValue" element={<GarantieList />} />
				<Route path="/garantie/index/:fieldName/:fieldValue" element={<GarantieList />} />
				<Route path="/garantie/view/:pageid" element={<GarantieView />} />
				<Route path="/garantie/add" element={<GarantieAdd />} />
				<Route path="/garantie/edit/:pageid" element={<GarantieEdit />} />

				{/* infoscompdemande pages routes */}
				<Route path="/infoscompdemande" element={<InfoscompdemandeList />} />
				<Route path="/infoscompdemande/:fieldName/:fieldValue" element={<InfoscompdemandeList />} />
				<Route path="/infoscompdemande/index/:fieldName/:fieldValue" element={<InfoscompdemandeList />} />
				<Route path="/infoscompdemande/view/:pageid" element={<InfoscompdemandeView />} />
				<Route path="/infoscompdemande/add" element={<InfoscompdemandeAdd />} />
				<Route path="/infoscompdemande/edit/:pageid" element={<InfoscompdemandeEdit />} />
				<Route path="/infoscompdemande/continue/:pageid" element={<InfoscompdemandeContinuePage />} />

				{/* lecturedesindex pages routes */}
				<Route path="/lecturedesindex" element={<LecturedesindexList />} />
				<Route path="/lecturedesindex/:fieldName/:fieldValue" element={<LecturedesindexList />} />
				<Route path="/lecturedesindex/index/:fieldName/:fieldValue" element={<LecturedesindexList />} />
				<Route path="/lecturedesindex/view/:pageid" element={<LecturedesindexView />} />
				<Route path="/lecturedesindex/add" element={<LecturedesindexAdd />} />
				<Route path="/lecturedesindex/edit/:pageid" element={<LecturedesindexEdit />} />

				{/* lignesfacture pages routes */}
				<Route path="/lignesfacture" element={<LignesfactureList />} />
				<Route path="/lignesfacture/:fieldName/:fieldValue" element={<LignesfactureList />} />
				<Route path="/lignesfacture/index/:fieldName/:fieldValue" element={<LignesfactureList />} />
				<Route path="/lignesfacture/view/:pageid" element={<LignesfactureView />} />
				<Route path="/lignesfacture/add" element={<LignesfactureAdd />} />
				<Route path="/lignesfacture/edit/:pageid" element={<LignesfactureEdit />} />

				{/* listmenus pages routes */}
				<Route path="/listmenus" element={<ListmenusList />} />
				<Route path="/listmenus/:fieldName/:fieldValue" element={<ListmenusList />} />
				<Route path="/listmenus/index/:fieldName/:fieldValue" element={<ListmenusList />} />
				<Route path="/listmenus/view/:pageid" element={<ListmenusView />} />
				<Route path="/listmenus/add" element={<ListmenusAdd />} />
				<Route path="/listmenus/edit/:pageid" element={<ListmenusEdit />} />
				<Route path="/listmenus/personnel" element={<ListmenusPersonnel />} />
				<Route path="/listmenus/personnel/:fieldName/:fieldValue" element={<ListmenusPersonnel />} />
				<Route path="/listmenus/patrimoine" element={<ListmenusPatrimoine />} />
				<Route path="/listmenus/patrimoine/:fieldName/:fieldValue" element={<ListmenusPatrimoine />} />
				<Route path="/listmenus/clients" element={<ListmenusClients />} />
				<Route path="/listmenus/clients/:fieldName/:fieldValue" element={<ListmenusClients />} />
				<Route path="/listmenus/dossierslocation" element={<ListmenusDossierslocation />} />
				<Route path="/listmenus/dossierslocation/:fieldName/:fieldValue" element={<ListmenusDossierslocation />} />
				<Route path="/listmenus/gestionreclamations" element={<ListmenusGestionreclamations />} />
				<Route path="/listmenus/gestionreclamations/:fieldName/:fieldValue" element={<ListmenusGestionreclamations />} />
				<Route path="/listmenus/demandeslogement" element={<ListmenusDemandeslogement />} />
				<Route path="/listmenus/demandeslogement/:fieldName/:fieldValue" element={<ListmenusDemandeslogement />} />
				<Route path="/listmenus/espaceclient" element={<ListmenusEspaceclient />} />
				<Route path="/listmenus/espaceclient/:fieldName/:fieldValue" element={<ListmenusEspaceclient />} />
				<Route path="/listmenus/gestioncompteurs" element={<ListmenusGestioncompteurs />} />
				<Route path="/listmenus/gestioncompteurs/:fieldName/:fieldValue" element={<ListmenusGestioncompteurs />} />

				{/* pavillon pages routes */}
				<Route path="/pavillon" element={<PavillonList />} />
				<Route path="/pavillon/:fieldName/:fieldValue" element={<PavillonList />} />
				<Route path="/pavillon/index/:fieldName/:fieldValue" element={<PavillonList />} />
				<Route path="/pavillon/view/:pageid" element={<PavillonView />} />
				<Route path="/pavillon/add" element={<PavillonAdd />} />
				<Route path="/pavillon/edit/:pageid" element={<PavillonEdit />} />

				{/* pavillondetails pages routes */}
				<Route path="/pavillondetails" element={<PavillondetailsList />} />
				<Route path="/pavillondetails/:fieldName/:fieldValue" element={<PavillondetailsList />} />
				<Route path="/pavillondetails/index/:fieldName/:fieldValue" element={<PavillondetailsList />} />

				{/* permissionsnode pages routes */}
				<Route path="/permissionsnode" element={<PermissionsnodeList />} />
				<Route path="/permissionsnode/:fieldName/:fieldValue" element={<PermissionsnodeList />} />
				<Route path="/permissionsnode/index/:fieldName/:fieldValue" element={<PermissionsnodeList />} />
				<Route path="/permissionsnode/view/:pageid" element={<PermissionsnodeView />} />
				<Route path="/permissionsnode/add" element={<PermissionsnodeAdd />} />
				<Route path="/permissionsnode/edit/:pageid" element={<PermissionsnodeEdit />} />
				<Route path="/permissionsnode/assign" element={<PermissionsnodeAssign />} />

				{/* proprietaire pages routes */}
				<Route path="/proprietaire" element={<ProprietaireList />} />
				<Route path="/proprietaire/:fieldName/:fieldValue" element={<ProprietaireList />} />
				<Route path="/proprietaire/index/:fieldName/:fieldValue" element={<ProprietaireList />} />
				<Route path="/proprietaire/view/:pageid" element={<ProprietaireView />} />
				<Route path="/proprietaire/add" element={<ProprietaireAdd />} />
				<Route path="/proprietaire/edit/:pageid" element={<ProprietaireEdit />} />

				{/* reclamation pages routes */}
				<Route path="/reclamation" element={<ReclamationList />} />
				<Route path="/reclamation/:fieldName/:fieldValue" element={<ReclamationList />} />
				<Route path="/reclamation/index/:fieldName/:fieldValue" element={<ReclamationList />} />
				<Route path="/reclamation/view/:pageid" element={<ReclamationView />} />
				<Route path="/reclamation/add" element={<ReclamationAdd />} />
				<Route path="/reclamation/edit/:pageid" element={<ReclamationEdit />} />
				<Route path="/reclamation/traitement" element={<ReclamationTraitement />} />
				<Route path="/reclamation/traitement/:fieldName/:fieldValue" element={<ReclamationTraitement />} />
				<Route path="/reclamation/resolue" element={<ReclamationResolue />} />
				<Route path="/reclamation/resolue/:fieldName/:fieldValue" element={<ReclamationResolue />} />

				{/* residence pages routes */}
				<Route path="/residence" element={<ResidenceList />} />
				<Route path="/residence/:fieldName/:fieldValue" element={<ResidenceList />} />
				<Route path="/residence/index/:fieldName/:fieldValue" element={<ResidenceList />} />
				<Route path="/residence/view/:pageid" element={<ResidenceView />} />
				<Route path="/residence/add" element={<ResidenceAdd />} />
				<Route path="/residence/edit/:pageid" element={<ResidenceEdit />} />

				{/* responsable pages routes */}
				<Route path="/responsable" element={<ResponsableList />} />
				<Route path="/responsable/:fieldName/:fieldValue" element={<ResponsableList />} />
				<Route path="/responsable/index/:fieldName/:fieldValue" element={<ResponsableList />} />
				<Route path="/responsable/view/:pageid" element={<ResponsableView />} />
				<Route path="/responsable/add" element={<ResponsableAdd />} />
				<Route path="/responsable/edit/:pageid" element={<ResponsableEdit />} />

				{/* roles pages routes */}
				<Route path="/roles" element={<RolesList />} />
				<Route path="/roles/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/index/:fieldName/:fieldValue" element={<RolesList />} />
				<Route path="/roles/view/:pageid" element={<RolesView />} />
				<Route path="/roles/add" element={<RolesAdd />} />
				<Route path="/roles/edit/:pageid" element={<RolesEdit />} />

				{/* tarification pages routes */}
				<Route path="/tarification" element={<TarificationList />} />
				<Route path="/tarification/:fieldName/:fieldValue" element={<TarificationList />} />
				<Route path="/tarification/index/:fieldName/:fieldValue" element={<TarificationList />} />
				<Route path="/tarification/view/:pageid" element={<TarificationView />} />
				<Route path="/tarification/add" element={<TarificationAdd />} />
				<Route path="/tarification/edit/:pageid" element={<TarificationEdit />} />

				{/* unitelocation pages routes */}
				<Route path="/unitelocation" element={<UnitelocationList />} />
				<Route path="/unitelocation/:fieldName/:fieldValue" element={<UnitelocationList />} />
				<Route path="/unitelocation/index/:fieldName/:fieldValue" element={<UnitelocationList />} />
				<Route path="/unitelocation/view/:pageid" element={<UnitelocationView />} />
				<Route path="/unitelocation/add" element={<UnitelocationAdd />} />
				<Route path="/unitelocation/edit/:pageid" element={<UnitelocationEdit />} />
				<Route path="/unitelocation/freeunits" element={<UnitelocationFreeunits />} />
				<Route path="/unitelocation/freeunits/:fieldName/:fieldValue" element={<UnitelocationFreeunits />} />

				{/* unitelocationdetails pages routes */}
				<Route path="/unitelocationdetails" element={<UnitelocationdetailsList />} />
				<Route path="/unitelocationdetails/:fieldName/:fieldValue" element={<UnitelocationdetailsList />} />
				<Route path="/unitelocationdetails/index/:fieldName/:fieldValue" element={<UnitelocationdetailsList />} />
				<Route path="/unitelocationdetails/freeunits" element={<UnitelocationdetailsFreeunits />} />
				<Route path="/unitelocationdetails/freeunits/:fieldName/:fieldValue" element={<UnitelocationdetailsFreeunits />} />

				{/* usersnode pages routes */}
				<Route path="/usersnode" element={<UsersnodeList />} />
				<Route path="/usersnode/:fieldName/:fieldValue" element={<UsersnodeList />} />
				<Route path="/usersnode/index/:fieldName/:fieldValue" element={<UsersnodeList />} />
				<Route path="/usersnode/view/:pageid" element={<UsersnodeView />} />
				<Route path="/usersnode/add" element={<UsersnodeAdd />} />
				<Route path="/usersnode/edit/:pageid" element={<UsersnodeEdit />} />
				<Route path="/client_temp" element={<ClientTempPage />} />
				<Route path="/account/*" element={<AccountPages />} />
			</Route>
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/" element={<DefaultPage />} />
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
