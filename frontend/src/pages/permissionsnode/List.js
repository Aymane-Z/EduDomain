import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { ImportPageData } from 'components/ImportPageData';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
const PermissionsnodeListPage = (props) => {
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
			command: (event) => { app.navigate(`/permissionsnode/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('permissionsnode/view')
		},
		{
			label: $t('edit'),
			command: (event) => { app.navigate(`/permissionsnode/edit/${data.id}`) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('permissionsnode/edit')
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('permissionsnode/delete')
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
	function RoleIdTemplate(data){
		if(data){
			return (
				<>{data.role_id && <Button className="p-button-text" icon="pi pi-eye" label={data.roles_role_name} to={`/roles/view/${data.role_id}`} /> }</>
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
			const downloadFileName = `${utils.dateNow()}-permissionsnode`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function ImportData() {
		if (props.importData) {
			return (
				<div className="m-2">
					<ImportPageData label={$t('selectAFileToImport')} uploadPath="permissionsnode/importdata" buttonIcon="pi pi-folder" buttonLabel={$t('importerDesDonnes')} onImportCompleted={(response) => {app.flashMsg('Import Data', response, 'success')}} />
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
	<CanView pagePath="permissionsnode/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
	<CanView pagePath="permissionsnode/importdata">
		<ImportData />
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
<main id="PermissionsnodeListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('permissions')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed sm:col-3 " >
                    <CanView pagePath={props.apiPath}>
                        <Link to={`/permissionsnode/assign`}>
                            <Button label={$t('attribuerUnePermission')} icon="pi pi-check-circle" type="button" className="p-button w-full p-button-sm bg-primary p-button-outlined "  />
                            </Link>
                        </CanView>
                        <CanView pagePath={props.apiPath}>
                            <Link to={`/permissionsnode/add`}>
                                <Button label={$t('nouvellePermission')} icon="pi pi-plus" type="button" className="p-button w-full p-button-sm bg-primary p-button-outlined "  />
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
                <div className="container">
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
                                        <Column  field="role_id" header={$t('role')} body={RoleIdTemplate} sortable={true} ></Column>
                                        <Column  field="permission" header={$t('permission')}  sortable={true} ></Column>
                                        <Column  field="page_name" header={$t('pageName')}  sortable={true} ></Column>
                                        <Column  field="action_name" header={$t('actionName')}  sortable={true} ></Column>
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
PermissionsnodeListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'permissionsnode',
	apiPath: 'permissionsnode/index',
	routeName: 'permissionsnodelist',
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
}
export default PermissionsnodeListPage;
