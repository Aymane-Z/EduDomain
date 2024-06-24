import { useState } from 'react';
import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Column } from 'primereact/column';
import { DataSource } from 'components/DataSource';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { PageRequestError } from 'components/PageRequestError';
import { PageSearch } from 'components/PageSearch';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import FactureViewPage from 'pages/facture/View';
import UnitelocationViewPage from 'pages/unitelocation/View';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import UsersnodeViewPage from 'pages/usersnode/View';
import useUtils from 'hooks/useUtils';
import { ImageViewer } from 'components/ImageViewer';
import useListPage from 'hooks/useListPage';
import useApi from 'hooks/useApi';
const EncaissementValidesPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const api = useApi();
	const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		},
		id_residence: {
			tagTitle: $t('idResidence'),
			value: [],
			valueType: 'multiple',
			options: [],
		},
		designation: {
			tagTitle: $t('designation'),
			value: [],
			valueType: 'multiple',
			options: [],
		},
		banque: {
			tagTitle: $t('banque'),
			value: [],
			valueType: 'multiple',
			options: app.menus.banque2,
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination } = pageController;
	const { filters, setFilterValue, setFilterOptions } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	const [Modal219, setModal219] = useState(false);

	const unvalidatePayment = async (rowData) => {
		try {
			
			const updateResponse = await api.post(`encaissement/edit/${rowData.id}`, {
				status: "en attente"
			});
			console.log('Payment update successful', updateResponse);
	
			
			const etatunite = await api.post('etatunite/updatestate',{
				etat : 'En cours de reservation',
				description : 'Phase de paiement des frais de reservation',
				observation : 'Etat temporaire',
				id_unitelocation : rowData.id_unite_location
			});
			console.log('Etat Added successfully', etatunite);
		} catch (error) {
			console.error('Error processing validation:', error);
		}
	};


	function ActionButton(data){
		const items = [
		{
			label: $t('view'),
			command: (event) => { app.navigate(`/encaissement/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('encaissement/view')
		},
		{
			label: $t('edit'),
			command: (event) => { app.navigate(`/encaissement/edit/${data.id}`) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('encaissement/edit')
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('encaissement/delete')
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
	function RecuTemplate(data){
		if(data){
			return (
				<><ImageViewer imageSize="small" previewSize="" src={data.encaissementdetails_recu} width="50px" height="50px" numDisplay={1} style={{maxWidth:'100%'}} /></>
			);
		}
	}
	function MontantTemplate(data){
		if(data){
			return (
				<>{utils.currency( data.montant , 'MAD', 2)}</>
			);
		}
	}
	function UserIdTemplate(data){
		if(data){
			return (
				<>{data.user_id && <Button className="p-button-text" icon="pi pi-user" label={data.usersnode_email} onClick={() => app.openPageDialog(<UsersnodeViewPage isSubPage apiPath={`/usersnode/view/${data.user_id}`} />, {closeBtn: true })} /> }</>
			);
		}
	}
	function IdFactureTemplate(data){
		if(data){
			return (
				<>{data.id_facture && <Button className="p-button-text" icon="pi pi-file" label={data.facture_code} onClick={() => app.openPageDialog(<FactureViewPage isSubPage apiPath={`/facture/view/${data.id_facture}`} />, {closeBtn: true })} /> }</>
			);
		}
	}
	function IdUniteLocationTemplate(data){
		if(data){
			return (
				<>{data.id_unite_location && <Button className="p-button-text" icon="pi pi-eye" label={data.unitelocation_code} onClick={() => app.openPageDialog(<UnitelocationViewPage isSubPage apiPath={`/unitelocation/view/${data.id_unite_location}`} />, {closeBtn: true })} /> }</>
			);
		}
	}
	function BanqueTemplate(data){
		if(data){
			return (
				<>{ data.encaissementdetails_banque }</>
			);
		}
	}
	function ReferenceTemplate(data){
		if(data){
			return (
				<>{ data.encaissementdetails_reference }</>
			);
		}
	}
	function NomTemplate(data){
		if(data){
			return (
				<>{ data.encaissementdetails_nom }</>
			);
		}
	}
	function PrenomTemplate(data){
		if(data){
			return (
				<>{ data.encaissementdetails_prenom }</>
			);
		}
	}
	function DateTemplate(data){
		if(data){
			return (
				<>{data.date && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(data.date)} tooltip={utils.humanDatetime(data.date)} />}</>
			);
		}
	}
	function DateCreatedTemplate(data){
		if(data){
			return (
				<>{data.date_created && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(data.date_created)} tooltip={utils.humanDatetime(data.date_created)} />}</>
			);
		}
	}
	function DateUpdatedTemplate(data){
		if(data){
			return (
				<>{data.date_updated && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(data.date_updated)} tooltip={utils.humanDatetime(data.date_updated)} />}</>
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
					{$t('noRecordFound')}
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
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-encaissement`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">{$t('records')} <b>{ recordsPosition } {$t('of')} { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
	<CanView pagePath="encaissement/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
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
	const unValidateButton = (rowData) => {
		return (
			<Button label="Annuler la validation" 
					className="p-button-error" 
					onClick={() => unvalidatePayment(rowData)} />
		);
	};
	return (
<main id="EncaissementValidesPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('encaissement')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-12 md:col-3 " >
                    <PageSearch menuClassName="card p-2" icon="pi pi-search" searchPage="encaissement/externes" placeholder={$t('search')} emptySearchMsg="{$t('noRecordFound')}">
                    {
                    (data) => <div className="p-2">
                        <Link to={`/encaissement/view/${data.id}`}>
                            <div>{ data.date }</div>
                            <div>{ data.montant }</div>
                            <div>{ data.observation }</div>
                            <div>{ data.id_client }</div>
                            <div>{ data.user_id }</div>
                            <div>{ data.id_facture }</div>
                            <div>{ data.id_unite_location }</div>
                            <div>{ data.banque }</div>
                            <div>{ data.reference }</div>
                            <div>{ data.nom }</div>
                            <div>{ data.prenom }</div>
                            <div>{ data.recu }</div>
                            <div>{ data.date_updated }</div>
                            <div>{ data.date_created }</div>
                            </Link>
                        </div>
                        }
                        </PageSearch>
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section mb-3" >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <div className="card  s">
                            <Button label="Filtrer" icon="" onClick={()=>setModal219(true)} className="" />
                            <Dialog dismissableMask visible={Modal219} onHide={()=>setModal219(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '750px'}} modal  header={<>
                                Types encaissements
                                </>}>
                                <div className="card  sp-3 mb-3">
                                    <DataSource onLoad={(options) => setFilterOptions('id_residence', options)}  apiPath="components_data/id_residence_option_list_4"  >
                                        {
                                        ({ response }) => 
                                        <>
                                        <Title title={$t('filterParResidence')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500"      separator={false} />
                                        <div className="">
                                            <MultiSelect className="w-full" optionLabel="label" optionValue="value" value={filters.id_residence.value} onChange={(e) => setFilterValue('id_residence', e.value)} options={filters.id_residence.options} label="" >
                                            </MultiSelect>
                                        </div>
                                        </>
                                        }
                                    </DataSource>
                                </div>
                                <div className="card  sp-3 mb-3">
                                    <DataSource onLoad={(options) => setFilterOptions('designation', options)}  apiPath="components_data/designation_option_list"  >
                                        {
                                        ({ response }) => 
                                        <>
                                        <Title title={$t('filtrer')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500"      separator={false} />
                                        <div className="">
                                            <MultiSelect className="w-full" optionLabel="label" optionValue="value" value={filters.designation.value} onChange={(e) => setFilterValue('designation', e.value)} options={filters.designation.options} label="" >
                                            </MultiSelect>
                                        </div>
                                        </>
                                        }
                                    </DataSource>
                                </div>
                                <div className="card  sp-3 mb-3">
                                    <Title title={$t('filterParBanque')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500"      separator={false} />
                                    <div className="">
                                        <MultiSelect className="w-full" optionLabel="label" optionValue="value" value={filters.banque.value} onChange={(e) => setFilterValue('banque', e.value)} options={filters.banque.options} label="" >
                                        </MultiSelect>
                                    </div>
                                </div>
                            </Dialog>
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
                            <div className="page-records">
                                <DataTable 
                                    lazy={true} 
                                    loading={loading} 
                                    selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                    value={records} 
                                    dataKey="id" 
                                    sortField={sortBy} 
                                    sortOrder={sortOrder} 
                                    onSort={onSort}
                                    className=" p-datatable-sm" 
                                    stripedRows={true}
                                    showGridlines={false} 
                                    rowHover={true} 
                                    responsiveLayout="stack" 
                                    emptyMessage={<EmptyRecordMessage />} 
                                    >
                                    {/*PageComponentStart*/}
                                    <Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
									<Column headerStyle={{width: '2rem'}} headerClass="text-center" body={unValidateButton}></Column>
                                    <Column  field="status" header={$t('status')}  sortable={true} ></Column>
                                    <Column  field="encaissementdetails_recu" header={$t('reuDePaiement')} body={RecuTemplate} sortable={true} ></Column>
                                    <Column  field="montant" header={$t('montant')} body={MontantTemplate} sortable={true} ></Column>
                                    <Column  field="observation" header={$t('observation')}  sortable={true} ></Column>
                                    <Column  field="id_client" header={$t('client')}  sortable={true} ></Column>
                                    <Column  field="user_id" header={$t('user')} body={UserIdTemplate} sortable={true} ></Column>
                                    <Column  field="id_facture" header={$t('facture')} body={IdFactureTemplate} sortable={true} ></Column>
                                    <Column  field="id_unite_location" header={$t('uniteDeLocation')} body={IdUniteLocationTemplate} sortable={true} ></Column>
                                    <Column  field="encaissementdetails_banque" header={$t('banque')} body={BanqueTemplate} sortable={true} ></Column>
                                    <Column  field="encaissementdetails_reference" header={$t('referenceDePaiement')} body={ReferenceTemplate} sortable={true} ></Column>
                                    <Column  field="encaissementdetails_nom" header={$t('nom')} body={NomTemplate} sortable={true} ></Column>
                                    <Column  field="encaissementdetails_prenom" header={$t('prnom')} body={PrenomTemplate} sortable={true} ></Column>
                                    <Column  field="date" header={$t('dateSaisie')} body={DateTemplate} sortable={true} ></Column>
                                    <Column  field="date_updated" header={$t('dateUpdated')} body={DateUpdatedTemplate} sortable={true} ></Column>
                                    <Column  field="date_created" header={$t('dateCreated')} body={DateCreatedTemplate} sortable={true} ></Column>
                                    <Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
                                    {/*PageComponentEnd*/}
                                </DataTable>
                            </div>
                            <PageFooter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
EncaissementValidesPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/valides',
	routeName: 'encaissementvalides',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: false,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default EncaissementValidesPage;
