import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const EncaissementexterneEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		banque: yup.string().nullable().label($t('banque')),
		reference: yup.string().required().label($t('reference')),
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prenom')),
		recu: yup.string().required().label($t('recu')),
		id_encaissement: yup.string().nullable().label($t('idEncaissement'))
	});
	// form default values
	const formDefaultValues = {
		banque: "NULL", 
		reference: '', 
		nom: "NULL", 
		prenom: "NULL", 
		recu: '', 
		id_encaissement: '', 
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
			app.navigate(`/encaissementexterne`);
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
<main id="EncaissementexterneEditPage" className="main-page">
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
                    <Title title={$t('editEncaissementExterne')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('banque')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="banque"  onChange={formik.handleChange}  value={formik.values.banque}   label={$t('banque')} type="text" placeholder={$t('enterBanque')}        className={inputClassName(formik?.errors?.banque)} />
                                                <ErrorMessage name="banque" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('reference')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="reference"  onChange={formik.handleChange}  value={formik.values.reference}   label={$t('reference')} type="text" placeholder={$t('enterReference')}        className={inputClassName(formik?.errors?.reference)} />
                                                <ErrorMessage name="reference" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('nom')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nom"  onChange={formik.handleChange}  value={formik.values.nom}   label={$t('nom')} type="text" placeholder={$t('enterNom')}        className={inputClassName(formik?.errors?.nom)} />
                                                <ErrorMessage name="nom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('prenom')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="prenom"  onChange={formik.handleChange}  value={formik.values.prenom}   label={$t('prenom')} type="text" placeholder={$t('enterPrenom')}        className={inputClassName(formik?.errors?.prenom)} />
                                                <ErrorMessage name="prenom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('recu')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="recu"  className={inputClassName(formik?.errors?.recu)}   value={formik.values.recu} placeholder={$t('enterRecu')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="recu" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('idEncaissement')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_encaissement_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_encaissement"     optionLabel="label" optionValue="value" value={formik.values.id_encaissement} onChange={formik.handleChange} options={response} label={$t('idEncaissement')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.id_encaissement)}   />
                                                    <ErrorMessage name="id_encaissement" component="span" className="p-error" />
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
EncaissementexterneEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissementexterne',
	apiPath: 'encaissementexterne/edit',
	routeName: 'encaissementexterneedit',
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
export default EncaissementexterneEditPage;
