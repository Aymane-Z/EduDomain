import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
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

import useListPage from 'hooks/useListPage';
const EncaissementFraisreservationPage = (props) => {
		const auth = useAuth();
	const app = useApp();
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
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
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
	function DateTemplate(data){
		if(data){
			return (
				<>{data.date && <Button className="p-0 p-button-plain p-button-text" label={utils.relativeDate(data.date)} tooltip={utils.humanDatetime(data.date)} />}</>
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
	function RecuTemplate(data){
		if(data){
			return (
				<>{ data.encaissementdetails_recu }</>
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
	return (
<main id="EncaissementFraisreservationPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('encaissement')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    <CanView pagePath="">
                        <Link to={`/encaissement/add`}>
                            <Button label={$t('addNewEncaissement')} icon="pi pi-plus" type="button" className="p-button w-full bg-primary "  />
                            </Link>
                        </CanView>
                    </div>
                    <div className="col-12 md:col-3 " >
                        <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
                        <InputText placeholder={$t('search')} className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                        </span>
                    </div>
                </div>
            </div>
        </section>
        }
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
                                    <Column  field="date" header={$t('saisieIlYA')} body={DateTemplate} sortable={true} ></Column>
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
                                    <Column  field="encaissementdetails_recu" header={$t('reuDePaiement')} body={RecuTemplate} sortable={true} ></Column>
                                    <Column  field="date_updated" header={$t('dateUpdated')}  sortable={true} ></Column>
                                    <Column  field="date_created" header={$t('dateCreated')}  sortable={true} ></Column>
                                    <Column  field="status" header={$t('status')}  sortable={true} ></Column>
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
EncaissementFraisreservationPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/fraisreservation',
	routeName: 'encaissementfraisreservation',
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
export default EncaissementFraisreservationPage;
