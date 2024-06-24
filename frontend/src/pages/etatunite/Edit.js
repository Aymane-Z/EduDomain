import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const EtatuniteEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		id_unitelocation: yup.string().nullable().label($t('idUnitelocation')),
		etat: yup.string().required().label($t('etat')),
		description: yup.string().nullable().label($t('description')),
		observation: yup.string().nullable().label($t('observation')),
		dt_debut_etat: yup.string().nullable().label($t('dateDebutEtat')),
		dt_fin_etat: yup.string().nullable().label($t('dateFinEtat')),
		ouvert_location: yup.string().nullable().label($t('ouvertLocation'))
	});
	// form default values
	const formDefaultValues = {
		id_unitelocation: '', 
		etat: '', 
		description: '', 
		observation: '', 
		dt_debut_etat: new Date(), 
		dt_fin_etat: new Date(), 
		ouvert_location: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/etatunite`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="EtatuniteEditPage" className="main-page">
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
                    <Title title={$t('editEtatUnite')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('idUnitelocation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_unite_location_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_unitelocation"     optionLabel="label" optionValue="value" value={formik.values.id_unitelocation} onChange={formik.handleChange} options={response} label={$t('idUnitelocation')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_unitelocation)}   />
                                                    <ErrorMessage name="id_unitelocation" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('etat')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/etat_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="etat"     optionLabel="label" optionValue="value" value={formik.values.etat} onChange={formik.handleChange} options={response} label={$t('etat')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.etat)}   />
                                                    <ErrorMessage name="etat" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('description')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="description"  onChange={formik.handleChange}  value={formik.values.description}   label={$t('description')} type="text" placeholder={$t('enterDescription')}        className={inputClassName(formik?.errors?.description)} />
                                                <ErrorMessage name="description" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('observation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="observation"  onChange={formik.handleChange}  value={formik.values.observation}   label={$t('observation')} type="text" placeholder={$t('enterObservation')}        className={inputClassName(formik?.errors?.observation)} />
                                                <ErrorMessage name="observation" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dateDebutEtat')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dt_debut_etat" showButtonBar className={inputClassName(formik?.errors?.dt_debut_etat)} dateFormat="yy-mm-dd" value={formik.values.dt_debut_etat} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dt_debut_etat" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dateFinEtat')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dt_fin_etat" showButtonBar className={inputClassName(formik?.errors?.dt_fin_etat)} dateFormat="yy-mm-dd" value={formik.values.dt_fin_etat} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dt_fin_etat" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('ouvertLocation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ouvert_location"  onChange={formik.handleChange}  value={formik.values.ouvert_location}   label={$t('ouvertLocation')} type="text" placeholder={$t('enterOuvertLocation')}        className={inputClassName(formik?.errors?.ouvert_location)} />
                                                <ErrorMessage name="ouvert_location" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label={$t('modifier')} icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
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
EtatuniteEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'etatunite',
	apiPath: 'etatunite/edit',
	routeName: 'etatuniteedit',
	submitButtonLabel: $t('modifier'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('updateRecord'),
	msgAfterSave: $t('enregistrementMisJourAvecSuccs'),
	msgBeforeSave: $t(''),
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default EtatuniteEditPage;
