import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const EncaissementexterneAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		banque: yup.string().nullable().label($t('slctionnerUneBanque')),
		reference: yup.string().required().label($t('rferenceDuPaiement')),
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prnom')),
		recu: yup.string().required().label($t('reuDePaiement'))
	});
	
	//form default values
	const formDefaultValues = {
		banque: '', 
		reference: '', 
		nom: '', 
		prenom: '', 
		recu: '', 
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
			app.navigate(`/encaissementexterne`);
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
<main id="EncaissementexterneAddPage" className="main-page">
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
                    <Title title={$t('addNewEncaissementExterne')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('slctionnerUneBanque')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Dropdown  name="banque"     optionLabel="label" optionValue="value" value={formik.values.banque} onChange={formik.handleChange} options={app.menus.banque} label={$t('slctionnerUneBanque')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.banque)}   />
                                                <ErrorMessage name="banque" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('rferenceDuPaiement')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="reference"  onChange={formik.handleChange}  value={formik.values.reference}   label={$t('rferenceDuPaiement')} type="text" placeholder={$t('enterRferenceDuPaiement')}        className={inputClassName(formik?.errors?.reference)} />
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
                                                {$t('prnom')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="prenom"  onChange={formik.handleChange}  value={formik.values.prenom}   label={$t('prnom')} type="text" placeholder={$t('enterPrnom')}        className={inputClassName(formik?.errors?.prenom)} />
                                                <ErrorMessage name="prenom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('reuDePaiement')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.recu)}>
                                                    <Uploader name="recu" showUploadedFiles value={formik.values.recu} uploadPath="fileuploader/upload/recu" onChange={(paths) => formik.setFieldValue('recu', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label={$t('chooseFilesOrDropFilesHere')} onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="recu" component="span" className="p-error" />
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
EncaissementexterneAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissementexterne',
	apiPath: 'encaissementexterne/add',
	routeName: 'encaissementexterneadd',
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
export default EncaissementexterneAddPage;
