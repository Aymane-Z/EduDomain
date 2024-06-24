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
const LecturedesindexAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		mois_consommation: yup.string().nullable().label($t('moisConsommation')),
		index_eau_froid: yup.number().nullable().label($t('indexEauFroid')),
		index_eau_chaud: yup.number().nullable().label($t('indexEauChaud')),
		index_electricite: yup.number().nullable().label($t('indexElectricite')),
		observation: yup.string().nullable().label($t('observation')),
		id_client: yup.string().nullable().label($t('client')),
		id_unite_location: yup.string().nullable().label($t('uniteDeLocation')),
		date: yup.string().nullable().label($t('date'))
	});
	
	//form default values
	const formDefaultValues = {
		mois_consommation: '', 
		index_eau_froid: '', 
		index_eau_chaud: '', 
		index_electricite: '', 
		observation: '', 
		id_client: '', 
		id_unite_location: '', 
		date: new Date(), 
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
			app.navigate(`/lecturedesindex`);
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
<main id="LecturedesindexAddPage" className="main-page">
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
                    <Title title={$t('addNewLectureDesIndex')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('moisConsommation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="mois_consommation"  onChange={formik.handleChange}  value={formik.values.mois_consommation}   label={$t('moisConsommation')} type="text" placeholder={$t('enterMoisConsommation')}        className={inputClassName(formik?.errors?.mois_consommation)} />
                                                <ErrorMessage name="mois_consommation" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('indexEauFroid')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="index_eau_froid"  onChange={formik.handleChange}  value={formik.values.index_eau_froid}   label={$t('indexEauFroid')} type="number" placeholder={$t('enterIndexEauFroid')}  min={0}  step={0.1}    className={inputClassName(formik?.errors?.index_eau_froid)} />
                                                <ErrorMessage name="index_eau_froid" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('indexEauChaud')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="index_eau_chaud"  onChange={formik.handleChange}  value={formik.values.index_eau_chaud}   label={$t('indexEauChaud')} type="number" placeholder={$t('enterIndexEauChaud')}  min={0}  step={0.1}    className={inputClassName(formik?.errors?.index_eau_chaud)} />
                                                <ErrorMessage name="index_eau_chaud" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('indexElectricite')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="index_electricite"  onChange={formik.handleChange}  value={formik.values.index_electricite}   label={$t('indexElectricite')} type="number" placeholder={$t('enterIndexElectricite')}  min={0}  step={0.1}    className={inputClassName(formik?.errors?.index_electricite)} />
                                                <ErrorMessage name="index_electricite" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('observation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="observation"  className={inputClassName(formik?.errors?.observation)}   value={formik.values.observation} placeholder={$t('enterObservation')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="observation" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
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
                                                {$t('date')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date" showButtonBar className={inputClassName(formik?.errors?.date)} dateFormat="yy-mm-dd" value={formik.values.date} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="date" component="span" className="p-error" />
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
LecturedesindexAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'lecturedesindex',
	apiPath: 'lecturedesindex/add',
	routeName: 'lecturedesindexadd',
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
export default LecturedesindexAddPage;
