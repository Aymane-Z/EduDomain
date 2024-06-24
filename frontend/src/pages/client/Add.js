import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const ClientAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		code: yup.string().required().label($t('code')),
		nom_prenom: yup.string().nullable().label($t('nomEtPrnom')),
		cin: yup.string().nullable().label($t('nCin')),
		date_naissance: yup.string().nullable().label($t('dateNaissance')),
		lieu_naissance: yup.string().nullable().label($t('lieuNaissance')),
		situation_familiale: yup.string().nullable().label($t('situationFamilale')),
		adresse: yup.string().nullable().label($t('adresse')),
		tel1: yup.string().nullable().label($t('tlphone1')),
		tel2: yup.string().nullable().label($t('tlphone2')),
		tel3: yup.string().nullable().label($t('tlphone3')),
		mail: yup.string().nullable().label($t('email')),
		etablissement: yup.string().nullable().label($t('etablissement')),
		cycle_etudes: yup.string().nullable().label($t('cycleEtudes'))
	});
	
	//form default values
	const formDefaultValues = {
		code: '', 
		nom_prenom: '', 
		cin: '', 
		date_naissance: new Date(), 
		lieu_naissance: '', 
		situation_familiale: '', 
		adresse: '', 
		tel1: '', 
		tel2: '', 
		tel3: '', 
		mail: '', 
		etablissement: '', 
		cycle_etudes: '', 
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
			app.navigate(`/client`);
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
<main id="ClientAddPage" className="main-page">
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
                    <Title title={$t('addNewClient')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('nomEtPrnom')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nom_prenom"  onChange={formik.handleChange}  value={formik.values.nom_prenom}   label={$t('nomEtPrnom')} type="text" placeholder={$t('enterNomEtPrnom')}        className={inputClassName(formik?.errors?.nom_prenom)} />
                                                <ErrorMessage name="nom_prenom" component="span" className="p-error" />
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
                                                {$t('dateNaissance')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date_naissance" showButtonBar className={inputClassName(formik?.errors?.date_naissance)} dateFormat="yy-mm-dd" value={formik.values.date_naissance} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="date_naissance" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('lieuNaissance')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="lieu_naissance"  onChange={formik.handleChange}  value={formik.values.lieu_naissance}   label={$t('lieuNaissance')} type="text" placeholder={$t('enterLieuNaissance')}        className={inputClassName(formik?.errors?.lieu_naissance)} />
                                                <ErrorMessage name="lieu_naissance" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('situationFamilale')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="situation_familiale"  onChange={formik.handleChange}  value={formik.values.situation_familiale}   label={$t('situationFamilale')} type="text" placeholder={$t('enterSituationFamilale')}        className={inputClassName(formik?.errors?.situation_familiale)} />
                                                <ErrorMessage name="situation_familiale" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('adresse')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="adresse"  className={inputClassName(formik?.errors?.adresse)}   value={formik.values.adresse} placeholder={$t('enterAdresse')} onChange={formik.handleChange}   >
                                                </InputTextarea>
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
                                                <InputText name="tel1"  onChange={formik.handleChange}  value={formik.values.tel1}   label={$t('tlphone1')} type="tel" placeholder={$t('enterTlphone1')}        className={inputClassName(formik?.errors?.tel1)} />
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
                                                <InputText name="tel2"  onChange={formik.handleChange}  value={formik.values.tel2}   label={$t('tlphone2')} type="tel" placeholder={$t('enterTlphone2')}        className={inputClassName(formik?.errors?.tel2)} />
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
                                                <InputText name="tel3"  onChange={formik.handleChange}  value={formik.values.tel3}   label={$t('tlphone3')} type="tel" placeholder={$t('enterTlphone3')}        className={inputClassName(formik?.errors?.tel3)} />
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
                                                {$t('etablissement')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="etablissement"  onChange={formik.handleChange}  value={formik.values.etablissement}   label={$t('etablissement')} type="text" placeholder={$t('enterEtablissement')}        className={inputClassName(formik?.errors?.etablissement)} />
                                                <ErrorMessage name="etablissement" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('cycleEtudes')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="cycle_etudes"  onChange={formik.handleChange}  value={formik.values.cycle_etudes}   label={$t('cycleEtudes')} type="text" placeholder={$t('enterCycleEtudes')}        className={inputClassName(formik?.errors?.cycle_etudes)} />
                                                <ErrorMessage name="cycle_etudes" component="span" className="p-error" />
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
ClientAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'client',
	apiPath: 'client/add',
	routeName: 'clientadd',
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
export default ClientAddPage;
