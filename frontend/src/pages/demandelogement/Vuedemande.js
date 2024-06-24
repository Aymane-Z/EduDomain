import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import UnitelocationFreeunitsPage from 'pages/unitelocation/Freeunits';
import useApp from 'hooks/useApp';
import { Splitter, SplitterPanel } from 'primereact/splitter';


import useViewPage from 'hooks/useViewPage';
const DemandelogementVuedemandePage = (props) => {
		const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError } = pageController;
	function ActionButton(data){
		const items = []
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
				</div>
			);
		}
	}
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
<main id="DemandelogementVuedemandePage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('reservation')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container-fluid">
            <div className="grid ">

                <div className="col-12 md:col-4 lg:col-3 p-fluid" >
                    <div className="card" >
                        {/*PageComponentStart*/}
                        <div className="mb-3 ">
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('codeDemande')}</div>
                                    <div className="font-bold">{ item.code_demande }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('nom')}</div>
                                    <div className="font-bold">{ item.nom }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('prenom')}</div>
                                    <div className="font-bold">{ item.prenom }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('nCin')}</div>
                                    <div className="font-bold">{ item.cin_client }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('pays')}</div>
                                    <div className="font-bold">{ item.pays_client }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('email')}</div>
                                    <div className="font-bold">{ item.email_client }</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('tlphone')}</div>
                                    <div className="font-bold">{ item.tel_1_client }</div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>

                
                
                <div className="col-12 md:col-7 lg:col-8 p-fluid" >
                    <div className="card">
                        { pageReady &&
                        <UnitelocationFreeunitsPage isSubPage primaryKey={item.id} id_client={item.id_client} limit="10" showHeader={true} showBreadcrumbs={true} showFooter={true} paginate={true} >
                        </UnitelocationFreeunitsPage>
                        }
                    </div>
                </div>

            </div>
        </div>
    </section>
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid ">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('prcdent')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
DemandelogementVuedemandePage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'demandelogement',
	apiPath: 'demandelogement/vuedemande',
	routeName: 'demandelogementvuedemande',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default DemandelogementVuedemandePage;
