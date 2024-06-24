import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterTags } from 'components/FilterTags';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Title } from 'components/Title';
import useUtils from 'hooks/useUtils';
import SharedDataContext from 'components/SharedDataContext';
import React, { useEffect, useContext  } from 'react';
import useListPage from 'hooks/useListPage';
const EncaissementPaiementdetailsPage = (props) => {
		const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, sortBy, sortOrder, apiRequestError, getPageBreadCrumbs, onSort, deleteItem, } = pageController;
	const { filters, setFilterValue } = filterController;

	const { setsharedData } = useContext(SharedDataContext);
    
	React.useEffect(() => {
        if (records) {
            setsharedData(records);
        }
    }, [records, setsharedData]);

	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="EncaissementPaiementdetailsPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('encaissement')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                
                    
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container">
                <div className="grid ">
                    <div className="col comp-grid" >
                        
                       
                        
						
						
{records.map((data, index) => 
<div  key={index}>
                    <div className="card" >
                        {/*PageComponentStart*/}
                        <div >
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('Code Demande :')}</div>
                                    <div className="font-bold">{data.demande_logement_code_demande}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('Unité de location choisie :')}</div>
                                    <div className="font-bold"> {data.unitelocationdetails_code}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('Type chambre :')}</div>
                                    <div className="font-bold"> {data.famille_unite_type}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('nom')}</div>
                                    <div className="font-bold">{data.usersnode_nom}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('prenom')}</div>
                                    <div className="font-bold">{data.usersnode_prenom}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('nCin')}</div>
                                    <div className="font-bold">{data.usersnode_cin}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="grid align-items-center">
                                <div className="col">
                                    <div className="text-400 font-medium mb-1">{$t('Prix de Loyer par mois :')}</div>
                                    <div className="font-bold"> {utils.currency( data.famille_unite_prix , 'MAD', 2)}</div>
                                </div>
                            </div>
                            <hr />
							<div className="grid align-items-center justify-content-center">
    <div className="col">
        <div className="text-lg font-semibold text-align-center text-green-600">{$t('MONTANT A PAYER :')}</div>
        <div className="text-2xl font-bold text-align-center text-green-700"> {utils.currency(data.encaissement_montant, 'MAD', 2)}</div>
    </div>
</div>

                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>)}

                        
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
EncaissementPaiementdetailsPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/paiementdetails',
	routeName: 'encaissementpaiementdetails',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: false,
	importData: false,
	keepRecords: true,
	multiCheckbox: false,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
}
export default EncaissementPaiementdetailsPage;
