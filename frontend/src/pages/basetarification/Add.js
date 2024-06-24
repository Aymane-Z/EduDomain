import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const BasetarificationAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		code: yup.string().required().label($t('code')),
		designation: yup.string().nullable().label($t('designation')),
		dt_application: yup.string().nullable().label($t('dtApplication')),
		dt_fin: yup.string().nullable().label($t('dtFin')),
		periodicite: yup.string().nullable().label($t('periodicite')),
		montant: yup.string().nullable().label($t('montant')),
		id_residence: yup.string().nullable().label($t('residence')),
		id_type_chambre: yup.number().nullable().label($t('idTypeChambre'))
	});
	
	//form default values
	const formDefaultValues = {
		code: '', 
		designation: '', 
		dt_application: new Date(), 
		dt_fin: "NULL", 
		periodicite: '', 
		montant: '', 
		id_residence: '', 
		id_type_chambre: "NULL", 
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
			app.navigate(`/basetarification`);
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
<main id="BasetarificationAddPage" className="main-page">
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
                    <Title title={$t('addNewBaseTarification')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('code')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="code"  onChange={formik.handleChange}  value={formik.values.code}   label={$t('code')} type="text" placeholder={$t('enterCode')}        className={inputClassName(formik?.errors?.code)} />
                                                <ErrorMessage name="code" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('designation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="designation"  onChange={formik.handleChange}  value={formik.values.designation}   label={$t('designation')} type="text" placeholder={$t('enterDesignation')}        className={inputClassName(formik?.errors?.designation)} />
                                                <ErrorMessage name="designation" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dtApplication')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dt_application" showButtonBar className={inputClassName(formik?.errors?.dt_application)} dateFormat="yy-mm-dd" value={formik.values.dt_application} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dt_application" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dtFin')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dt_fin" showButtonBar className={inputClassName(formik?.errors?.dt_fin)} dateFormat="yy-mm-dd" value={formik.values.dt_fin} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dt_fin" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('periodicite')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Dropdown  name="periodicite"     optionLabel="label" optionValue="value" value={formik.values.periodicite} onChange={formik.handleChange} options={app.menus.periodicite} label={$t('periodicite')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.periodicite)}   />
                                                <ErrorMessage name="periodicite" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('montant')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="montant"  onChange={formik.handleChange}  value={formik.values.montant}   label={$t('montant')} type="text" placeholder={$t('enterMontant')}        className={inputClassName(formik?.errors?.montant)} />
                                                <ErrorMessage name="montant" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('residence')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_residence_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_residence"     optionLabel="label" optionValue="value" value={formik.values.id_residence} onChange={formik.handleChange} options={response} label={$t('residence')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_residence)}   />
                                                    <ErrorMessage name="id_residence" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('idTypeChambre')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="id_type_chambre"  onChange={formik.handleChange}  value={formik.values.id_type_chambre}   label={$t('idTypeChambre')} type="number" placeholder={$t('enterIdTypeChambre')}  min={0}  step="any"    className={inputClassName(formik?.errors?.id_type_chambre)} />
                                                <ErrorMessage name="id_type_chambre" component="span" className="p-error" />
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
BasetarificationAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'basetarification',
	apiPath: 'basetarification/add',
	routeName: 'basetarificationadd',
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
export default BasetarificationAddPage;
