import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Knob } from 'primereact/knob';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import UnitelocationViewPage from 'pages/unitelocation/View';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';
import { Chip } from 'primereact/chip';
import useViewPage from 'hooks/useViewPage';
import MasterDetailPages from './MasterDetailPages';
const DemandelogementSuiviPage = (props) => {
	const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const pageController = useViewPage(props);
	const { item, currentRecord, pageReady, loading, apiRequestError, deleteItem, moveToNextRecord, moveToPreviousRecord } = pageController;
	const pageExportFormats =  [
		'pdf'
	];
    const getStatusColor = (status) => {
        if (!status) return 'grey';
        switch (status.toLowerCase()) {
          case 'soumise': return 'blue';
          case 'en attente': return 'yellow';
          case 'validee': return 'green';
          case 'rejetee': return 'red';
          case 'client effectif': return 'black';
          default: return 'grey';
        }
      };
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="DemandelogementSuiviPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('demandeLogementDetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        <div className="grid ">
                            <div className="col">
                                {/*PageComponentStart*/}
                                <div className="mb-3 grid ">
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('codeDemande')}</div>
                                                <div className="font-bold">{ item.code_demande }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('etatDemande')}</div>
                                                <div className="font-bold">
                                                    <Chip label={item.etat_demande} style={{ backgroundColor: getStatusColor(item.etat_demande), color: 'white' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('nom')}</div>
                                                <div className="font-bold">{ item.nom }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('prenom')}</div>
                                                <div className="font-bold">{ item.prenom }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('nCinClient')}</div>
                                                <div className="font-bold">{ item.cin_client }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('lieuNaissance')}</div>
                                                <div className="font-bold">{ item.lieu_naissance }</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('paysClient')}</div>
                                                <div className="font-bold">{ item.pays_client }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('tel1Client')}</div>
                                                <div className="font-bold">{ item.tel_1_client }</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('emailClient')}</div>
                                                <div className="font-bold">{ item.email_client }</div>
                                            </div>
                                        </div>
                                    </div>
                                    {item.id_unite_location &&
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('uniteLocation')}</div>
                                                <div className="font-bold">{item.id_unite_location && <Button className="p-button-text" icon="pi pi-eye" label={item.unitelocation_code} onClick={() => app.openPageDialog(<UnitelocationViewPage isSubPage apiPath={`/unitelocation/view/${item.id_unite_location}`} />, {closeBtn: true })} /> }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    { item.type_chambre &&
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('typeChambre')}</div>
                                                <div className="font-bold">{ item.type_chambre }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    { item.binome_souhaite &&
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('binomeSouhait')}</div>
                                                <div className="font-bold">{ item.binome_souhaite }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('dateRequest')}</div>
                                                <div className="font-bold">{item.date_created && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(item.date_created)} tooltip={utils.humanDatetime(item.date_created)} />}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('dateUpdated')}</div>
                                                <div className="font-bold">{item.date_updated && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(item.date_updated)} tooltip={utils.humanDatetime(item.date_updated)} />}</div>
                                            </div>
                                        </div>
                                    </div>
                                    { item.id_type_chambre &&
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('idTypeChambre')}</div>
                                                <div className="font-bold">{ item.id_type_chambre }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    { item.id_residence &&
                                    <div className="col-12 md:col-4">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('idResidence')}</div>
                                                <div className="font-bold">{ item.id_residence }</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                {/*PageComponentEnd*/}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				
			</div>
		);
	}
}
DemandelogementSuiviPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'demandelogement',
	apiPath: 'demandelogement/view',
	routeName: 'demandelogementview',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default DemandelogementSuiviPage;
