import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ReclamationAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		id_client: yup.string().nullable().label($t('client')),
		id_unite_location: yup.string().nullable().label($t('uniteDeLocation')),
		id_dossierlocation: yup.string().nullable().label($t('dossierDeLocation')),
		user_id: yup.string().nullable().label($t('userId')),
		type: yup.string().nullable().label($t('type')),
		description: yup.string().nullable().label($t('description')),
		status: yup.string().nullable().label($t('status')),
		date_resolue: yup.string().nullable().label($t('dateResolue'))
	});
	
	//form default values
	const formDefaultValues = {
		id_client: '', 
		id_unite_location: '', 
		id_dossierlocation: '', 
		user_id: '', 
		type: '', 
		description: '', 
		status: '', 
		date_resolue: new Date(), 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/reclamation`);
		}
	}
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="ReclamationAddPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title={$t('addNewReclamation')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('client')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_client_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_client"     optionLabel="label" optionValue="value" value={formik.values.id_client} onChange={formik.handleChange} options={response} label={$t('client')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_client)}   />
                                                    <ErrorMessage name="id_client" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('uniteDeLocation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_unite_location_option_list_2"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_unite_location"     optionLabel="label" optionValue="value" value={formik.values.id_unite_location} onChange={formik.handleChange} options={response} label={$t('uniteDeLocation')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_unite_location)}   />
                                                    <ErrorMessage name="id_unite_location" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dossierDeLocation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_dossierlocation_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_dossierlocation"     optionLabel="label" optionValue="value" value={formik.values.id_dossierlocation} onChange={formik.handleChange} options={response} label={$t('dossierDeLocation')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.id_dossierlocation)}   />
                                                    <ErrorMessage name="id_dossierlocation" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('userId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/user_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="user_id"     optionLabel="label" optionValue="value" value={formik.values.user_id} onChange={formik.handleChange} options={response} label={$t('userId')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.user_id)}   />
                                                    <ErrorMessage name="user_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('type')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="type"  onChange={formik.handleChange}  value={formik.values.type}   label={$t('type')} type="text" placeholder={$t('enterType')}        className={inputClassName(formik?.errors?.type)} />
                                                <ErrorMessage name="type" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('description')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="description"  className={inputClassName(formik?.errors?.description)}   value={formik.values.description} placeholder={$t('enterDescription')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="description" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('status')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="status"  onChange={formik.handleChange}  value={formik.values.status}   label={$t('status')} type="text" placeholder={$t('enterStatus')}        className={inputClassName(formik?.errors?.status)} />
                                                <ErrorMessage name="status" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dateResolue')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date_resolue" value={formik.values.date_resolue} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.date_resolue)}        />
                                                <ErrorMessage name="date_resolue" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label={$t('soumettre')} icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}

//page props and default values
ReclamationAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'reclamation',
	apiPath: 'reclamation/add',
	routeName: 'reclamationadd',
	submitButtonLabel: $t('soumettre'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('createRecord'),
	msgAfterSave: $t('enregistrementAjoutAvecSuccs'),
	msgBeforeSave: $t(''),
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default ReclamationAddPage;
