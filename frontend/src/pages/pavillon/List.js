import { useState } from 'react';
import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { CanView } from 'components/Can';
import { Column } from 'primereact/column';
import { DataSource } from 'components/DataSource';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { ImportPageData } from 'components/ImportPageData';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import BatimentViewPage from 'pages/batiment/View';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
import MasterDetailPages from './MasterDetailPages';
const PavillonListPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		},
		dt_mise_service: {
			tagTitle: $t('dateMiseEnService'),
			value: [],
			valueType: 'range-date',
			options: [],
		},
		id_residence: {
			tagTitle: $t('residence'),
			value: [],
			valueType: 'multiple',
			options: [],
		},
		id_batiment: {
			tagTitle: $t('batiment'),
			value: [],
			valueType: 'multiple',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, deleteItem, pagination, expandRow, expandedRows } = pageController;
	const { filters, setFilterValue, setFilterOptions } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, currentPage, limit, onPageChange } =  pagination;
	const [Modal780, setModal780] = useState(false);
	function ActionButton(data){
		const items = [
		{
			label: $t('view'),
			command: (event) => { app.navigate(`/pavillon/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('pavillon/view')
		},
		{
			label: $t('edit'),
			command: (event) => { app.navigate(`/pavillon/edit/${data.id}`) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('pavillon/edit')
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('pavillon/delete')
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
	function CodeTemplate(data){
		if(data){
			return (
				<Link to={`/pavillon/view/${data.id}`}> { data.code }</Link>
			);
		}
	}
	function IdBatimentTemplate(data){
		if(data){
			return (
				<>{data.id_batiment && <Button className="p-button-text" icon="pi pi-eye" label={data.batiment_code} onClick={() => app.openPageDialog(<BatimentViewPage isSubPage apiPath={`/batiment/view/${data.id_batiment}`} />, {closeBtn: true })} /> }</>
			);
		}
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
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-pavillon`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('exporter')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function ImportData() {
		if (props.importData) {
			return (
				<div className="m-2">
					<ImportPageData label={$t('selectAFileToImport')} uploadPath="pavillon/importdata" buttonIcon="pi pi-folder" buttonLabel={$t('importData')} onImportCompleted={(response) => {app.flashMsg('Import Data', response, 'success')}} />
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
	<CanView pagePath="pavillon/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
	<CanView pagePath="pavillon/importdata">
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
<main id="PavillonListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('pavillon')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-fixed " >
                    <CanView pagePath={props.apiPath}>
                        <Link to={`/pavillon/add`}>
                            <Button label={$t('addNewPavillon')} icon="pi pi-plus" type="button" className="p-button w-full bg-primary "  />
                            </Link>
                        </CanView>
                    </div>
                    <div className="col-12 md:col-3 " >
                        <div className="p-inputgroup flex-1 mb-3">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-search"></i>
                            </span>
                                <InputText placeholder={$t('search')} className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                        </div>
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
                            <Button label="Filtres Avancés" icon="pi pi-sliders-v" onClick={()=>setModal780(true)} className="" />
                            <Dialog dismissableMask visible={Modal780} onHide={()=>setModal780(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '750px'}} modal  header={<>
                                Filtres Avancés
                                </>}>
                                <div className="card  sp-3 mb-3">
                                    <Title title={$t('filterParDateMiseEnService')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500" pi pi-sliders-vclass   pi-sliders-vright  separator={false} />
                                    <div className="">
                                        <Calendar showIcon={true} showButtonBar={true} dateFormat="yy-mm-dd" hourFormat="24" className="w-full" selectionMode="range" value={filters.dt_mise_service.value} onChange={(e) => setFilterValue('dt_mise_service', e.value)} placeholder={$t('selectDate')}   />
                                    </div>
                                </div>
                                <div className="card  sp-3 mb-3">
                                    <DataSource onLoad={(options) => setFilterOptions('id_residence', options)}  apiPath="components_data/id_residence_option_list_3"  >
                                        {
                                        ({ response }) => 
                                        <>
                                        <Title title={$t('filterParResidence')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500" pi pi-sliders-vclass   pi-sliders-vright  separator={false} />
                                        <div className="">
                                            <MultiSelect className="w-full" optionLabel="label" optionValue="value" value={filters.id_residence.value} onChange={(e) => setFilterValue('id_residence', e.value)} options={filters.id_residence.options} label="" >
                                            </MultiSelect>
                                        </div>
                                        </>
                                        }
                                    </DataSource>
                                </div>
                                <div className="card  sp-3 mb-3">
                                    <DataSource onLoad={(options) => setFilterOptions('id_batiment', options)}  apiPath="components_data/id_batiment_option_list_3"  >
                                        {
                                        ({ response }) => 
                                        <>
                                        <Title title={$t('filterParBatiment')} text headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500" pi pi-sliders-vclass   pi-sliders-vright  separator={false} />
                                        <div className="">
                                            <MultiSelect className="w-full" optionLabel="label" optionValue="value" value={filters.id_batiment.value} onChange={(e) => setFilterValue('id_batiment', e.value)} options={filters.id_batiment.options} label="" >
                                            </MultiSelect>
                                        </div>
                                        </>
                                        }
                                    </DataSource>
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
                                    expandedRows={expandedRows} 
                                    onRowToggle={(event) => expandRow(event)}
                                    rowExpansionTemplate={RowExpansionTemplate}
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
                                    <Column expander={true} style={{ width: '3em' }} />
                                        <Column  field="code" header={$t('code')} body={CodeTemplate} sortable={true} ></Column>
                                        <Column  field="type" header={$t('type')}  sortable={true} ></Column>
                                        <Column  field="denomination" header={$t('denomination')}  sortable={true} ></Column>
                                        <Column  field="description" header={$t('description')}  sortable={true} ></Column>
                                        <Column  field="nombre_niveaux" header={$t('nombreNiveaux')}  sortable={true} ></Column>
                                        <Column  field="nombre_entrees" header={$t('nombreEntrees')}  sortable={true} ></Column>
                                        <Column  field="dt_mise_service" header={$t('dateMiseEnService')}  sortable={true} ></Column>
                                        <Column  field="id_batiment" header={$t('batiment')} body={IdBatimentTemplate} sortable={true} ></Column>
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
PavillonListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'pavillon',
	apiPath: 'pavillon/index',
	routeName: 'pavillonlist',
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
export default PavillonListPage;
