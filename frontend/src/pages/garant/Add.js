import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const GarantAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		code: yup.string().required().label($t('code')),
		denomination: yup.string().nullable().label($t('denomination')),
		gerant: yup.string().nullable().label($t('gerant')),
		cin: yup.string().nullable().label($t('nCin')),
		adresse: yup.string().nullable().label($t('adresse')),
		rc: yup.string().nullable().label($t('rc')),
		patente: yup.string().nullable().label($t('patente')),
		tel1: yup.string().nullable().label($t('tlphone1')),
		tel2: yup.string().nullable().label($t('tlphone2')),
		tel3: yup.string().nullable().label($t('tlphone3')),
		mail: yup.string().nullable().label($t('email')),
		compte_bancaire: yup.string().nullable().label($t('compteBancaire')),
		profession: yup.string().nullable().label($t('profession')),
		revenus_mensuels: yup.string().nullable().label($t('revenusMensuels'))
	});
	
	//form default values
	const formDefaultValues = {
		code: '', 
		denomination: '', 
		gerant: '', 
		cin: '', 
		adresse: '', 
		rc: '', 
		patente: '', 
		tel1: '', 
		tel2: '', 
		tel3: '', 
		mail: '', 
		compte_bancaire: '', 
		profession: '', 
		revenus_mensuels: '', 
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
			app.navigate(`/garant`);
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
<main id="GarantAddPage" className="main-page">
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
                    <Title title={$t('addNewGarant')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('gerant')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="gerant"  onChange={formik.handleChange}  value={formik.values.gerant}   label={$t('gerant')} type="text" placeholder={$t('enterGerant')}        className={inputClassName(formik?.errors?.gerant)} />
                                                <ErrorMessage name="gerant" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('nCin')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="cin"  onChange={formik.handleChange}  value={formik.values.cin}   label={$t('nCin')} type="text" placeholder={$t('enterNCin')}        className={inputClassName(formik?.errors?.cin)} />
                                                <ErrorMessage name="cin" component="span" className="p-error" />
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
                                                {$t('rc')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="rc"  onChange={formik.handleChange}  value={formik.values.rc}   label={$t('rc')} type="text" placeholder={$t('enterRc')}        className={inputClassName(formik?.errors?.rc)} />
                                                <ErrorMessage name="rc" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('patente')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="patente"  onChange={formik.handleChange}  value={formik.values.patente}   label={$t('patente')} type="text" placeholder={$t('enterPatente')}        className={inputClassName(formik?.errors?.patente)} />
                                                <ErrorMessage name="patente" component="span" className="p-error" />
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
                                                {$t('email')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="mail"  onChange={formik.handleChange}  value={formik.values.mail}   label={$t('email')} type="text" placeholder={$t('enterEmail')}        className={inputClassName(formik?.errors?.mail)} />
                                                <ErrorMessage name="mail" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('compteBancaire')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="compte_bancaire"  onChange={formik.handleChange}  value={formik.values.compte_bancaire}   label={$t('compteBancaire')} type="text" placeholder={$t('enterCompteBancaire')}        className={inputClassName(formik?.errors?.compte_bancaire)} />
                                                <ErrorMessage name="compte_bancaire" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('profession')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="profession"  onChange={formik.handleChange}  value={formik.values.profession}   label={$t('profession')} type="text" placeholder={$t('enterProfession')}        className={inputClassName(formik?.errors?.profession)} />
                                                <ErrorMessage name="profession" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('revenusMensuels')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="revenus_mensuels"  onChange={formik.handleChange}  value={formik.values.revenus_mensuels}   label={$t('revenusMensuels')} type="text" placeholder={$t('enterRevenusMensuels')}        className={inputClassName(formik?.errors?.revenus_mensuels)} />
                                                <ErrorMessage name="revenus_mensuels" component="span" className="p-error" />
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
GarantAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'garant',
	apiPath: 'garant/add',
	routeName: 'garantadd',
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
export default GarantAddPage;
