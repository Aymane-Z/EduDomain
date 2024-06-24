import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const ContratEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		ref_contrat: yup.string().required().label($t('refContrat')),
		date: yup.string().nullable().label($t('date')),
		observation: yup.string().nullable().label($t('observation')),
		remise: yup.string().nullable().label($t('remise')),
		franchize: yup.string().nullable().label($t('franchize'))
	});
	// form default values
	const formDefaultValues = {
		ref_contrat: '', 
		date: new Date(), 
		observation: '', 
		remise: '', 
		franchize: '', 
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
			app.navigate(`/contrat`);
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
<main id="ContratEditPage" className="main-page">
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
                    <Title title={$t('editContrat')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('refContrat')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="ref_contrat"  onChange={formik.handleChange}  value={formik.values.ref_contrat}   label={$t('refContrat')} type="text" placeholder={$t('enterRefContrat')}        className={inputClassName(formik?.errors?.ref_contrat)} />
                                                <ErrorMessage name="ref_contrat" component="span" className="p-error" />
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
                                                {$t('remise')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="remise"  onChange={formik.handleChange}  value={formik.values.remise}   label={$t('remise')} type="text" placeholder={$t('enterRemise')}        className={inputClassName(formik?.errors?.remise)} />
                                                <ErrorMessage name="remise" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('franchize')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="franchize"  onChange={formik.handleChange}  value={formik.values.franchize}   label={$t('franchize')} type="text" placeholder={$t('enterFranchize')}        className={inputClassName(formik?.errors?.franchize)} />
                                                <ErrorMessage name="franchize" component="span" className="p-error" />
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
ContratEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'contrat',
	apiPath: 'contrat/edit',
	routeName: 'contratedit',
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
export default ContratEditPage;
