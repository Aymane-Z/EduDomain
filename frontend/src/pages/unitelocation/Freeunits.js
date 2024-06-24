import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { FilterTags } from 'components/FilterTags';
import { Image } from 'components/ImageViewer';

import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { SplitButton } from 'primereact/splitbutton';
import { ToggleButton } from 'primereact/togglebutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';
import React, { useState, useHistory, useMemo } from 'react';
import useApi from 'hooks/useApi';
import useListPage from 'hooks/useListPage';
import MasterDetailPages from './MasterDetailPages';
import { useNavigate } from 'react-router-dom';
import './selectunits.css';
const UnitelocationFreeunitsPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const api = useApi();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		},
		id_residence: {
			tagTitle: $t('rsidence'),
			value: '',
			valueType: 'single',
			options: [],
		},
		type: {
			tagTitle: $t('type'),
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, apiRequestError, getPageBreadCrumbs, deleteItem, pagination } = pageController;
	const { filters, setFilterValue, setFilterOptions } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, currentPage, limit, onPageChange } =  pagination;
	const [selectedId, setSelectedId] = useState(null);
	const [selectedType, setSelectedType]=useState(null);
	const [selectedIdch, setSelectedIdch] = useState(null);
	//const [selectedItem, setSelectedItem] = useState(null);
	const [checkoutOption, setCheckoutOption] = useState(null);
	const [selectedCin, setSelectedCin] = useState(null);
	const [selectedIdResidence, setSelectedIdResidence] = useState(null);
	const { user } = useAuth();
	const userId = user.id;


	const [paymentType, setPaymentTypeState] = useState(utils.getPaymentType());
  

	const handleToggle = (data) => {
        if ( selectedId === data.id) {
            setSelectedId(null);
			//setSelectedItem(null);
			setCheckoutOption(null);
			setSelectedType(null);
			setSelectedIdResidence(null);
			 // Deselect
        } else {
            setSelectedId(data.id);
			//setSelectedItem(data);
			setSelectedIdch(data.freerentalunits_id_typech);
			setSelectedType(data.freerentalunits_categoriechambre);
			setSelectedIdResidence(data.freerentalunits_id_residence);
			//selectedIdch = data.freerentalunits_id_typech;
			//selectedId=data.id;
			console.log("id ch is :",data.id);
			console.log("id type is :",data.id_typech);
			console.log("var id is :",selectedId);
			console.log("var id type is :",selectedId);
			
        }
    };


	const selectOneRecordPerPriceCategory = (data) => {
		const groupedByPrice = {};
		// Group records by price
		data.forEach(item => {
			const price = item.freerentalunits_prix.toString(); // Ensure the price is treated as a string
			if (!groupedByPrice[price]) {
				groupedByPrice[price] = [];
			}
			groupedByPrice[price].push(item);
		});
	
		const selectedRecords = [];
		// Select one random record from each price category
		Object.keys(groupedByPrice).forEach(price => {
			const items = groupedByPrice[price];
			const randomIndex = Math.floor(Math.random() * items.length);
			selectedRecords.push(items[randomIndex]); // Add one randomly selected item from each group
		});
	
		return selectedRecords;
	};
	
	//const selectedRecords = selectOneRecordPerPriceCategory(records);
	const selectedRecords = useMemo(() => {
		return selectOneRecordPerPriceCategory(records);
	}, [records]);


	//const groupedRecords = groupByPrice(records);

	const history = useNavigate();

	function generateInvoiceCode(userId) {
		const date = new Date();
		const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
		const paddedUserId = userId.toString().padStart(4, '0'); 
		return `FAC-${dateString}-${paddedUserId}`;
	  }
	function generateLineItemCode(invoiceCode, lineItemNumber) {
		const paddedLineItemNumber = lineItemNumber.toString().padStart(4, '0'); // Pads the line item number to 4 digits
		return `${invoiceCode}-LI-${paddedLineItemNumber}`;
	  }

	const updateDemandeLogement = async (rec_id, id_unite_location, type_chambre, id_typech, id_residence, id_client) => {
		console.log("data collected: ", rec_id, id_unite_location, type_chambre, id_typech);
		//let currentDate = new Date();
		let currentDate = new Date().toISOString().slice(0, 10);
		try {
			utils.setPaymentType('FraisReservation');
	  		setPaymentTypeState('FraisReservation');
			//1) Modification de la demande de logement
			const updateResponse = await api.post(`demandelogement/edit/${rec_id}`, {
				etat_demande : 'en attente FR',
				id_unite_location: id_unite_location,
				type_chambre: type_chambre,
				id_type_chambre: id_typech,
				id_residence : id_residence
			});
			console.log('Update successful', updateResponse);
			//2) Creation d'une facturation
			//const createfacturation = await api.post(`facturation/add`, {
			//	dt_facturation: currentDate,
			//	id_unite_location: id_unite_location,
			//	user_id: userId
			//});
			//let facturation_id=createfacturation.data.id;
			let codefact=generateInvoiceCode(userId);
			//3) Creation d'une facture
			const createfacture = await api.post(`facture/add`, {
				code: codefact ,
				dt_facture: currentDate,
				id_unite_location: id_unite_location,
				user_id: userId,
				id_client : id_client
			});
			let facture_id=createfacture.data.id;

			//4) Trouver la base de tarification a utiliser
			console.log("id_residence : ", id_residence , " , Facture id : ", facture_id);
			const basetarifResponse = await api.get('basetarification/fetch', {
				params: {
					codePrefix: 'FR',
					id_residence: id_residence
				}
			});
			
			let basetarification_id = basetarifResponse.data ? basetarifResponse.data.id : null;

			let basetarification_montant = basetarifResponse.data ? basetarifResponse.data.montant : null;

			//5) Creation d'une ligne de facture
			let codelignefact=generateLineItemCode(codefact,basetarification_id);

			const createlignefacture = await api.post(`lignesfacture/add`, {
				code: codelignefact ,
				designation: "Frais de réservation",
				description : "Frais de traitement de la demande de logement",
				montant : basetarification_montant,
				id_facture: facture_id,
				id_base_tarif : basetarification_id
			});
			
			//6) Modification de l'etat de l'unité
			const etatunite = await api.post('etatunite/updatestate',{
				etat : 'En cours de reservation',
				description : 'Phase de paiement des frais de reservation',
				observation : 'Etat temporaire',
				id_unitelocation : id_unite_location
			});



			//7) Nouveau encaissement
			const encaissement = await api.post('encaissement/add',{
				observation : 'Frais de demande de logement',
				user_id : userId,
				montant : basetarification_montant,
				id_facture : facture_id,
				id_unite_location : id_unite_location,
				status : "en attente"
			});
			let encaissement_id=encaissement.data.id;


			history(`/encaissement/proceedpayment/recid/${encaissement_id}`); 
		} catch (error) {
			console.error('Error performing actions', error);
		}
	};

	function ActionButton(data){
		const items = [
		{
			label: $t('view'),
			command: (event) => { app.navigate(`/unitelocation/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('unitelocation/view')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function RowExpansionTemplate(data){
		if(data){
			return (
				<div className="card p-0"><MasterDetailPages masterRecord={data} scrollIntoView={false} /></div>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">{$t('loading')}</div>
					</div>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					{$t('aucunEnregistrementTrouv')}
				</div>
			);
		}
	}
	function MultiDelete() {
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title={$t('deleteSelected')}/>
				</div>
			)
		}
	}

	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">{$t('page')} <b>{ options.currentPage } {$t('of')} { options.totalPages }</b></span>
						<span className="text-sm text-gray-500 px-2">{$t('records')} <b>{ recordsPosition } {$t('of')} { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  rowsPerPageOptions={[5, 10, 20, 30, 50, 100, 200, 500, 1000]}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
	<CanView pagePath="unitelocation/delete">
		<MultiDelete />
	</CanView>
				
	<CanView pagePath="unitelocation/importdata">
		
	</CanView>
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
				</div>
			);
		}
	}
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="UnitelocationFreeunitsPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('uniteLocation')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    
                    </div>
                    <div className="col-12 md:col-3 " >
                        
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section mb-3 card " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <div className="card  sp-3 mb-3">
                            <DataSource onLoad={(options) => setFilterOptions('id_residence', options)}  apiPath="components_data/id_residence_option_list_4"  >
                                {
                                ({ response }) => 
                                <>
                                <Title title={$t('selectionnerUneRsidence')}  headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500" iconClass="pi pi-building" avatarSize="32px"    separator={false} />
                                <div className="">
                                    <Dropdown filter={true} className="w-full" onChange={(e) => setFilterValue( 'id_residence', e.value)} value={filters.id_residence.value} optionLabel="label" optionValue="value" options={filters.id_residence.options} placeholder={$t('selectionnerUneRsidence')} >
                                    </Dropdown>
                                </div>
                                </>
                                }
                            </DataSource>
                        </div>
                    </div>
                    <div className="col comp-grid" >
                        <div className="card  sp-3 mb-3">
                            <DataSource onLoad={(options) => setFilterOptions('type', options)}  apiPath="components_data/type_option_list"  >
                                {
                                ({ response }) => 
                                <>
                                <Title title={$t('slctionnerUnTypeDeChambres')}  headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500"      separator={false} />
                                <div className="">
                                    {
                                    filters.type.options.map((option) => {
                                    return (
                                    <div key={option.value} className="field-radiobutton">
                                        <RadioButton inputId={option.value} name="type" value={option.value} onChange={(e) => setFilterValue('type', e.value)}  checked={filters.type.value === option.value} />
                                        <label htmlFor={option.value}>{option.label}</label>
                                    </div>
                                    )
                                    })
                                    }
                                </div>
                                </>
                                }
                            </DataSource>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="page-section " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <FilterTags filterController={filterController} />
                        <div >
                            <PageBreadcrumbs />
                            <div className="grid  mb-3">
                            {selectedRecords.map((data, index) => 
                            <div className="col-12 md:col-4" key={index} >
                                {/*PageComponentStart*/}
                                <div className={selectedId === data.id ? 'card selected-card' : 'card' }>
                                    <div className="card-header p-3 font-bold text-lg text-primary">Chambre N° {data.id}</div>
                                    <div className="image-container">
									<Image style={{maxWidth: '100%', objectFit: 'cover'}} preview={false}  width="400" imageSize="medium" height="300" src={data.freerentalunits_photo} />
                                    </div>
									<div className="card-body p-3">
                                        <div className="font-semibold text-md">{data.freerentalunits_categoriechambre}</div>
                                        <div className="mt-2 px-3 flex justify-content-between align-items-center">
                                            <div>
                                                <div className="text-xs font-semibold">Prix</div>
                                                <div className="text-sm text-500">{data.freerentalunits_prix} DHs/Mois</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold">État Physique</div>
                                                <div className="text-sm text-500">{data.etat_physique}</div>
                                            </div>
                                            <div className="flex justify-content-end">
											
												{ActionButton(data)}
                                            </div>
											</div>
											<div className="flex justify-content-end">
											<ToggleButton 
                                        checked={selectedId === data.id }
                                        onChange={() => handleToggle(data)}
                                        onLabel="Déselectionner" 
                                        offLabel="Selectionner"
                                        onIcon="pi pi-times" 
                                        offIcon="pi pi-check"
                                        
                                    />
											</div>
                                        
                                    </div>
                                </div>
                                {/*PageComponentEnd*/}
                            </div>
                            )}
                        </div>
                            <EmptyRecordMessage />
                            <PageLoading />
                            <PageFooter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
		{selectedId && 
	<section>
	
                            <>

	
                <div>
					<div className="card  sp-3 mb-3">
                    <RadioButton inputId="autoAssign" value="auto" onChange={(e) => setCheckoutOption(e.value)} checked={checkoutOption === 'auto'} />
                    <label htmlFor="autoAssign">	  Attribuez-moi une unité de location dans la catégorie que j'ai choisie. imported id {props.primaryKey} , id_client is {props.id_client}</label>
                    </div>
					<div className="card  sp-3 mb-3">
					<RadioButton inputId="manualAssign" value="manual" onChange={(e) => setCheckoutOption(e.value)} checked={checkoutOption === 'manual'} />
                    <label htmlFor="manualAssign">	  Je souhaite introduire le numéro de chambre d'un binôme que je connais. id type :{selectedIdch} , categorie : {selectedType}</label>
					<div className="m-2">
						<label>Numéro de la chambre : </label>
                    <DataSource apiPath={`freerentalunits/list/famille_unite.id/${selectedIdch}`}>
    					{({ response }) => 
						Array.isArray(response.records) ? (
        					<>
            			<Dropdown
                
                optionLabel="code"
                optionValue="id"
                value={selectedId}
                onChange={(e) => setSelectedId(e.value)}
                options={response.records}
                label={$t('unite location')}
                placeholder={$t('selectAValue')}
                filter={true}
				disabled={checkoutOption === 'auto' || checkoutOption === null}
                className="w-full md:w-26rem"
            />
        				</>
						): (
							<div>Loading options or no options available..</div>
						)
    			}
					</DataSource>
					
												
					</div>
					<div className="m-2">
					<label>Numéro de la CIN du binôme : </label>
                    <DataSource apiPath={`client/index`}>
    					{({ response }) => 
						Array.isArray(response.records) ? (
        					<>
            			<Dropdown
                
                optionLabel="cin"
                optionValue="id"
                value={selectedCin}
                onChange={(e) => setSelectedCin(e.value)}
                options={response.records}
                label={$t('N° CIN du binôme')}
                placeholder={$t('selectAValue')}
                filter={true}
				disabled={checkoutOption === 'auto' || checkoutOption === null}
                className="w-full md:w-26rem"
            />
        				</>
						): (
							<div>Loading options or no options available..</div>
						)
    			}
					</DataSource>
					
												
					</div>
					</div>
                    <Button 
            label="Valider la réservation" 
            onClick={() => updateDemandeLogement(props.primaryKey, selectedId, selectedType, selectedIdch, selectedIdResidence, props.id_client)} 
            disabled={!checkoutOption} // Assume checkoutOption is defined and controls the button's disabled state
            className="p-button-success"
            size="small"
            rounded
        />
                </div>
            

                            </>
                            
		
	</section>	
}
    </main>
	);
}
UnitelocationFreeunitsPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'unitelocation',
	apiPath: 'unitelocation/freeunits',
	routeName: 'unitelocationfreeunits',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: true,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
	id_client: ''
}
export default UnitelocationFreeunitsPage;
