
import { $t } from 'hooks/i18n';
import React, { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Column } from 'primereact/column';
import { DataSource } from 'components/DataSource';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { ImageViewer } from 'components/ImageViewer';
import { PageRequestError } from 'components/PageRequestError';
import { RadioButton } from 'primereact/radiobutton';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';

import { ToggleButton } from 'primereact/togglebutton';
const FreerentalunitsListPage = (props) => {
		const auth = useAuth();
		const [selectedId, setSelectedId] = useState(null);
    const handleToggle = (data) => {
        if (selectedId === data.id) {
            setSelectedId(null); // Deselect
        } else {
            setSelectedId(data.id); // Select
        }
    };
	const app = useApp();
	const utils = useUtils();
	const filterSchema = {
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
	const { records, pageReady, loading, apiUrl, sortBy, sortOrder, apiRequestError, getPageBreadCrumbs, onSort, pagination } = pageController;
	const { filters, setFilterValue, setFilterOptions } = filterController;
	const { limit } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: $t('voirDtails'),
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
	function PhotoTemplate(data){
		if(data){
			return (
				<><ImageViewer imageSize="small" previewSize="" src={data.photo} width="50px" height="50px" numDisplay={1} style={{maxWidth:'100%'}} /></>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					{$t('pasDeUnits')}
				</div>
			);
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-freerentalunits`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel={$t('')} tooltip={$t('export')} buttonIcon="pi pi-print" />
				</div>
			);
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
<main id="FreerentalunitsListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col-10 " >
                    <Title title={$t('choisirUneChambre')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                <div className="col-2 comp-grid" >
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
                <div className="col-10 comp-grid" >
                    <FilterTags filterController={filterController} />
                    <div >
                        <PageBreadcrumbs />
                        <div className="page-records">
                            <DataTable 
                                lazy={true} 
                                loading={loading} 
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
                                <Column  field="id" header={$t('id')}  sortable={true} ></Column>
                                <Column  field="code" header={$t('code')}  sortable={true} ></Column>
                                <Column  field="designation" header={$t('designation')}  sortable={true} ></Column>
                                <Column  field="typeunit" header={$t('typeunit')}  sortable={true} ></Column>
                                <Column  field="description" header={$t('description')}  sortable={true} ></Column>
                                <Column  field="etat_physique" header={$t('etatPhysique')}  sortable={true} ></Column>
                                <Column  field="observation" header={$t('observation')}  sortable={true} ></Column>
                                <Column  field="etat" header={$t('etat')}  sortable={true} ></Column>
                                <Column  field="type" header={$t('type')}  sortable={true} ></Column>
                                <Column  field="prix" header={$t('prix')}  sortable={true} ></Column>
                                <Column  field="photo" header={$t('photo')} body={PhotoTemplate} sortable={true} ></Column>
                                <Column  field="categoriechambre" header={$t('categoriechambre')}  sortable={true} ></Column>
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
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid ">
                <div className="col comp-grid" >
                </div>
            </div>
        </div>
    </section>
</main>
	);
}
FreerentalunitsListPage.defaultProps = {
	primaryKey: '',
	pageName: 'freerentalunits',
	apiPath: 'freerentalunits/index',
	routeName: 'freerentalunitslist',
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
export default FreerentalunitsListPage;
