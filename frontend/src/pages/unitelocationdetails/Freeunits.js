import { $t } from 'hooks/i18n';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { Image } from 'components/ImageViewer';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
const UnitelocationdetailsFreeunitsPage = (props) => {
		const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: $t('search'),
			value: '',
			valueType: 'single',
			options: [],
		},
		id_residence: {
			tagTitle: $t('residence'),
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
	const { records, pageReady, loading, apiUrl, apiRequestError, getPageBreadCrumbs, pagination } = pageController;
	const { filters, setFilterValue, setFilterOptions } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, currentPage, limit, onPageChange } =  pagination;
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
					{$t('aucuneUniteTrouv')}
				</div>
			);
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-unitelocationdetails`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('exporter')} tooltip={$t('export')} buttonIcon="pi pi-print" />
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
<main id="UnitelocationdetailsFreeunitsPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col " >
                    <Title title={$t('unitelocationdetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
    <section className="page-section mb-3 card " >
        <div className="container-fluid">
            <div className="grid ">
                <div className="col-2 comp-grid" >
                    <div className="card  sp-3 mb-3">
                        <DataSource onLoad={(options) => setFilterOptions('id_residence', options)}  apiPath="components_data/id_residence_option_list_4"  >
                            {
                            ({ response }) => 
                            <>
                            <Title title={$t('selectionnerUneResidence')}  headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500" iconClass="pi pi-building" avatarSize="32px"    separator={false} />
                            <div className="">
                                <Dropdown filter={true} className="w-full" onChange={(e) => setFilterValue( 'id_residence', e.value)} value={filters.id_residence.value} optionLabel="label" optionValue="value" options={filters.id_residence.options} placeholder={$t('selectionnerUneRsidence')} >
                                </Dropdown>
                            </div>
                            </>
                            }
                        </DataSource>
                    </div>
                </div>
                <div className="col-2 comp-grid" >
                    <div className="card  sp-3 mb-3">
                        <DataSource onLoad={(options) => setFilterOptions('type', options)}  apiPath="components_data/type_option_list"  >
                            {
                            ({ response }) => 
                            <>
                            <Title title={$t('selectionnerUnType')}  headerClass="p-3" titleClass="font-bold text-primary" subTitleClass="text-sm text-500"      separator={false} />
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
                            {records.map((data, index) => 
                            <div className="col-12 md:col-4" key={index}>
                                {/*PageComponentStart*/}
                                <div className="card p-0 ">
                                    <div  className="p-3 font-bold text-lg text-primary ">{data.id}</div>
                                    <Image style={{maxWidth: '100%'}} preview={false}  width="auto" imageSize="medium" height="auto" src={data.familleunite_photo} />
                                    <div className="p-3">{data.familleunite_type}</div>
                                    <div className="mt-2 px-3 flex justify-content-between align-items-center">
                                        <div className="text-sm text-500">{data.etat_physique}</div>
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
</main>
	);
}
UnitelocationdetailsFreeunitsPage.defaultProps = {
	primaryKey: '',
	pageName: 'unitelocationdetails',
	apiPath: 'unitelocationdetails/freeunits',
	routeName: 'unitelocationdetailsfreeunits',
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
	multiCheckbox: false,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default UnitelocationdetailsFreeunitsPage;
