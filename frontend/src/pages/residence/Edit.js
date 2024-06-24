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
const ResidenceEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		code: yup.string().required().label($t('code')),
		denomination: yup.string().nullable().label($t('denomination')),
		dt_mise_service: yup.string().nullable().label($t('dateMiseEnService')),
		adresse: yup.string().nullable().label($t('adresse')),
		tel1: yup.string().nullable().label($t('tlphone1')),
		tel2: yup.string().nullable().label($t('tlphone2')),
		tel3: yup.string().nullable().label($t('tlphone3')),
		id_responsable: yup.string().nullable().label($t('responsable')),
		id_proprietaire: yup.string().nullable().label($t('proprietaire'))
	});
	// form default values
	const formDefaultValues = {
		code: '', 
		denomination: '', 
		dt_mise_service: new Date(), 
		adresse: '', 
		tel1: '', 
		tel2: '', 
		tel3: '', 
		id_responsable: '', 
		id_proprietaire: '', 
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
			app.navigate(`/residence`);
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
<main id="ResidenceEditPage" className="main-page">
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
                    <Title title={$t('editResidence')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('denomination')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="denomination"  onChange={formik.handleChange}  value={formik.values.denomination}   label={$t('denomination')} type="text" placeholder={$t('enterDenomination')}        className={inputClassName(formik?.errors?.denomination)} />
                                                <ErrorMessage name="denomination" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('dateMiseEnService')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="dt_mise_service" showButtonBar className={inputClassName(formik?.errors?.dt_mise_service)} dateFormat="yy-mm-dd" value={formik.values.dt_mise_service} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="dt_mise_service" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('adresse')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="adresse"  onChange={formik.handleChange}  value={formik.values.adresse}   label={$t('adresse')} type="text" placeholder={$t('enterAdresse')}        className={inputClassName(formik?.errors?.adresse)} />
                                                <ErrorMessage name="adresse" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('tlphone1')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="tel1"  onChange={formik.handleChange}  value={formik.values.tel1}   label={$t('tlphone1')} type="text" placeholder={$t('enterTlphone1')}        className={inputClassName(formik?.errors?.tel1)} />
                                                <ErrorMessage name="tel1" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('tlphone2')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="tel2"  onChange={formik.handleChange}  value={formik.values.tel2}   label={$t('tlphone2')} type="text" placeholder={$t('enterTlphone2')}        className={inputClassName(formik?.errors?.tel2)} />
                                                <ErrorMessage name="tel2" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('tlphone3')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="tel3"  onChange={formik.handleChange}  value={formik.values.tel3}   label={$t('tlphone3')} type="text" placeholder={$t('enterTlphone3')}        className={inputClassName(formik?.errors?.tel3)} />
                                                <ErrorMessage name="tel3" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('responsable')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_responsable_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_responsable"     optionLabel="label" optionValue="value" value={formik.values.id_responsable} onChange={formik.handleChange} options={response} label={$t('responsable')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_responsable)}   />
                                                    <ErrorMessage name="id_responsable" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('proprietaire')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_proprietaire_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_proprietaire"     optionLabel="label" optionValue="value" value={formik.values.id_proprietaire} onChange={formik.handleChange} options={response} label={$t('proprietaire')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_proprietaire)}   />
                                                    <ErrorMessage name="id_proprietaire" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
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
ResidenceEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'residence',
	apiPath: 'residence/edit',
	routeName: 'residenceedit',
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
export default ResidenceEditPage;
