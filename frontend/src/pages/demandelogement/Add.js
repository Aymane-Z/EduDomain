import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useAddPage from 'hooks/useAddPage';
const DemandelogementAddPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prenom')),
		cin_client: yup.string().nullable().label($t('cin')),
		date_naissance: yup.string().nullable().label($t('dateDeNaissance')),
		lieu_naissance: yup.string().nullable().label($t('lieuDeNaissance')),
		situation_familiale: yup.string().nullable().label($t('situationFamiliale')),
		adresse_client: yup.string().nullable().label($t('adresseActuelle')),
		code_postal_client: yup.string().nullable().label($t('codePostal')),
		ville_client: yup.string().nullable().label($t('ville')),
		pays_client: yup.string().nullable().label($t('pays')),
		tel_1_client: yup.string().nullable().label($t('nTlphoneDomicile')),
		tel_2_client: yup.string().nullable().label($t('nTlphoneGsm')),
		email_client: yup.string().email().nullable().label($t('email')),
		etablissement: yup.string().nullable().label($t('etablissementEtudes')),
		cycle_etudes: yup.string().nullable().label($t('cycleEtudes')),
		nom_garant: yup.string().nullable().label($t('nom')),
		prenom_garant: yup.string().nullable().label($t('prenom')),
		cin_garant: yup.string().nullable().label($t('cin')),
		date_naissance_garant: yup.string().nullable().label($t('dateDeNaissance')),
		lieu_naissance_garant: yup.string().nullable().label($t('lieuDeNaissance')),
		situation_familiale_garant: yup.string().nullable().label($t('situationFamiliale')),
		lien_garant_client: yup.string().nullable().label($t('lienFamilialAvecLeDemandeur')),
		adresse_garant: yup.string().nullable().label($t('adresse')),
		code_postal_garant: yup.string().nullable().label($t('codePostal')),
		ville_garant: yup.string().nullable().label($t('ville')),
		pays_garant: yup.string().nullable().label($t('pays')),
		tel1_garant: yup.string().nullable().label($t('nTlphoneDomicile')),
		tel2_garant: yup.string().nullable().label($t('nTlphoneGsm')),
		email_garant: yup.string().email().nullable().label($t('email')),
		profession: yup.string().nullable().label($t('profession')),
		tel_bureau: yup.string().nullable().label($t('tlBureau')),
		fax: yup.string().nullable().label($t('fax')),
		revenus_mensuels: yup.number().nullable().label($t('revenusMensuels')),
		id_type_chambre: yup.string().nullable().label($t('typeChambre')),
		binome_souhaite: yup.string().nullable().label($t('slctionnerOuEntrerLeNomDuBinomeSouhait')),
		cin_binome: yup.string().nullable().label($t('cinDuBinme')),
		code_demande: yup.string().nullable().label($t('codeDemande')),
		etat_demande: yup.string().nullable().label($t('etatDemande')),
		id_unite_location: yup.number().nullable().label($t('uniteLocation')),
		id_dossier: yup.string().nullable().label($t('dossier')),
		id_client: yup.string().nullable().label($t('client')),
		id_garant: yup.string().nullable().label($t('garant')),
		id_user: yup.string().nullable().label($t('user')),
		id_residence: yup.number().nullable().label($t('idResidence'))
	});
	
	//form default values
	const formDefaultValues = {
		nom: '', 
		prenom: '', 
		cin_client: '', 
		date_naissance: new Date(), 
		lieu_naissance: '', 
		situation_familiale: '', 
		adresse_client: '', 
		code_postal_client: '', 
		ville_client: '', 
		pays_client: '', 
		tel_1_client: '', 
		tel_2_client: '', 
		email_client: '', 
		etablissement: '', 
		cycle_etudes: '', 
		nom_garant: '', 
		prenom_garant: '', 
		cin_garant: '', 
		date_naissance_garant: new Date(), 
		lieu_naissance_garant: new Date(), 
		situation_familiale_garant: '', 
		lien_garant_client: '', 
		adresse_garant: '', 
		code_postal_garant: '', 
		ville_garant: '', 
		pays_garant: '', 
		tel1_garant: '', 
		tel2_garant: '', 
		email_garant: '', 
		profession: '', 
		tel_bureau: '', 
		fax: '', 
		revenus_mensuels: '', 
		id_type_chambre: '', 
		binome_souhaite: '', 
		cin_binome: '', 
		code_demande: '', 
		etat_demande: '', 
		id_unite_location: '', 
		id_dossier: '', 
		id_client: '', 
		id_garant: '', 
		id_user: auth.userId, 
		id_residence: "NULL", 
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
			app.navigate(`/demandelogement`);
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
<main id="DemandelogementAddPage" className="main-page">
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
                    <Title title={$t('addNewDemandeLogement')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                    <Fieldset legend={$t('informationsSurLeDemandeur')} toggleable>
                                        <div className="grid">
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
                                                        {$t('cin')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="cin_client"  onChange={formik.handleChange}  value={formik.values.cin_client}   label={$t('cin')} type="text" placeholder={$t('enterCin')}        className={inputClassName(formik?.errors?.cin_client)} />
                                                        <ErrorMessage name="cin_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('dateDeNaissance')} 
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
                                                        {$t('lieuDeNaissance')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="lieu_naissance"  onChange={formik.handleChange}  value={formik.values.lieu_naissance}   label={$t('lieuDeNaissance')} type="text" placeholder={$t('enterLieuDeNaissance')}        className={inputClassName(formik?.errors?.lieu_naissance)} />
                                                        <ErrorMessage name="lieu_naissance" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('situationFamiliale')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <div className="flex flex-wrap">
                                                            {
                                                            app.menus.situationFamiliale.map((option) => {
                                                            return (
                                                            <div key={option.value} className="field-radiobutton  mx-3">
                                                                <RadioButton inputId={option.value} name="situation_familiale" value={option.value} onChange={formik.handleChange}  checked={formik.values.situation_familiale === option.value} className={inputClassName(formik?.errors?.situation_familiale, '')} />
                                                                <label htmlFor={option.value}>{option.label}</label>
                                                            </div>
                                                            )
                                                            })
                                                            }
                                                        </div>
                                                        <ErrorMessage name="situation_familiale" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('adresseActuelle')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputTextarea name="adresse_client"  className={inputClassName(formik?.errors?.adresse_client)}   value={formik.values.adresse_client} placeholder={$t('enterAdresseActuelle')} onChange={formik.handleChange}   >
                                                        </InputTextarea>
                                                        <ErrorMessage name="adresse_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('codePostal')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="code_postal_client"  onChange={formik.handleChange}  value={formik.values.code_postal_client}   label={$t('codePostal')} type="text" placeholder={$t('enterCodePostal')}        className={inputClassName(formik?.errors?.code_postal_client)} />
                                                        <ErrorMessage name="code_postal_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('ville')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="ville_client"  onChange={formik.handleChange}  value={formik.values.ville_client}   label={$t('ville')} type="text" placeholder={$t('enterVille')}        className={inputClassName(formik?.errors?.ville_client)} />
                                                        <ErrorMessage name="ville_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('pays')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <Dropdown  name="pays_client"     optionLabel="label" optionValue="value" value={formik.values.pays_client} onChange={formik.handleChange} options={app.menus.paysClient} label={$t('pays')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.pays_client)}   />
                                                        <ErrorMessage name="pays_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('nTlphoneDomicile')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="tel_1_client"  onChange={formik.handleChange}  value={formik.values.tel_1_client}   label={$t('nTlphoneDomicile')} type="text" placeholder={$t('entrerTelDomicile')}        className={inputClassName(formik?.errors?.tel_1_client)} />
                                                        <ErrorMessage name="tel_1_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('nTlphoneGsm')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="tel_2_client"  onChange={formik.handleChange}  value={formik.values.tel_2_client}   label={$t('nTlphoneGsm')} type="text" placeholder={$t('entrerTelGsm')}        className={inputClassName(formik?.errors?.tel_2_client)} />
                                                        <ErrorMessage name="tel_2_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('email')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="email_client"  onChange={formik.handleChange}  value={formik.values.email_client}   label={$t('email')} type="email" placeholder={$t('enterEmail')}        className={inputClassName(formik?.errors?.email_client)} />
                                                        <ErrorMessage name="email_client" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('etablissementEtudes')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="etablissement"  onChange={formik.handleChange}  value={formik.values.etablissement}   label={$t('etablissementEtudes')} type="text" placeholder={$t('enterEtablissementEtudes')}        className={inputClassName(formik?.errors?.etablissement)} />
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
                                        </div></Fieldset>
                                        <Fieldset legend={$t('informationsSurLeGarant')} toggleable>
                                            <div className="grid">
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('nom')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="nom_garant"  onChange={formik.handleChange}  value={formik.values.nom_garant}   label={$t('nom')} type="text" placeholder={$t('enterNom')}        className={inputClassName(formik?.errors?.nom_garant)} />
                                                            <ErrorMessage name="nom_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('prenom')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="prenom_garant"  onChange={formik.handleChange}  value={formik.values.prenom_garant}   label={$t('prenom')} type="text" placeholder={$t('enterPrenom')}        className={inputClassName(formik?.errors?.prenom_garant)} />
                                                            <ErrorMessage name="prenom_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('cin')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="cin_garant"  onChange={formik.handleChange}  value={formik.values.cin_garant}   label={$t('cin')} type="text" placeholder={$t('enterCin')}        className={inputClassName(formik?.errors?.cin_garant)} />
                                                            <ErrorMessage name="cin_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('dateDeNaissance')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <Calendar name="date_naissance_garant" showButtonBar className={inputClassName(formik?.errors?.date_naissance_garant)} dateFormat="yy-mm-dd" value={formik.values.date_naissance_garant} onChange={formik.handleChange} showIcon        />
                                                            <ErrorMessage name="date_naissance_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('lieuDeNaissance')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <Calendar name="lieu_naissance_garant" showButtonBar className={inputClassName(formik?.errors?.lieu_naissance_garant)} dateFormat="yy-mm-dd" value={formik.values.lieu_naissance_garant} onChange={formik.handleChange} showIcon        />
                                                            <ErrorMessage name="lieu_naissance_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('situationFamiliale')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <div className="flex flex-wrap">
                                                                {
                                                                app.menus.situationFamiliale.map((option) => {
                                                                return (
                                                                <div key={option.value} className="field-radiobutton  mx-3">
                                                                    <RadioButton inputId={option.value} name="situation_familiale_garant" value={option.value} onChange={formik.handleChange}  checked={formik.values.situation_familiale_garant === option.value} className={inputClassName(formik?.errors?.situation_familiale_garant, '')} />
                                                                    <label htmlFor={option.value}>{option.label}</label>
                                                                </div>
                                                                )
                                                                })
                                                                }
                                                            </div>
                                                            <ErrorMessage name="situation_familiale_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('lienFamilialAvecLeDemandeur')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="lien_garant_client"  onChange={formik.handleChange}  value={formik.values.lien_garant_client}   label={$t('lienFamilialAvecLeDemandeur')} type="text" placeholder={$t('lienGarantClient')}        className={inputClassName(formik?.errors?.lien_garant_client)} />
                                                            <ErrorMessage name="lien_garant_client" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('adresse')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputTextarea name="adresse_garant"  className={inputClassName(formik?.errors?.adresse_garant)}   value={formik.values.adresse_garant} placeholder={$t('enterAdresse')} onChange={formik.handleChange}   >
                                                            </InputTextarea>
                                                            <ErrorMessage name="adresse_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('codePostal')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="code_postal_garant"  onChange={formik.handleChange}  value={formik.values.code_postal_garant}   label={$t('codePostal')} type="text" placeholder={$t('enterCodePostal')}        className={inputClassName(formik?.errors?.code_postal_garant)} />
                                                            <ErrorMessage name="code_postal_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('ville')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="ville_garant"  onChange={formik.handleChange}  value={formik.values.ville_garant}   label={$t('ville')} type="text" placeholder={$t('enterVille')}        className={inputClassName(formik?.errors?.ville_garant)} />
                                                            <ErrorMessage name="ville_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('pays')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <Dropdown  name="pays_garant"     optionLabel="label" optionValue="value" value={formik.values.pays_garant} onChange={formik.handleChange} options={app.menus.paysClient} label={$t('pays')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.pays_garant)}   />
                                                            <ErrorMessage name="pays_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('nTlphoneDomicile')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="tel1_garant"  onChange={formik.handleChange}  value={formik.values.tel1_garant}   label={$t('nTlphoneDomicile')} type="text" placeholder={$t('entrerTelDomicile')}        className={inputClassName(formik?.errors?.tel1_garant)} />
                                                            <ErrorMessage name="tel1_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('nTlphoneGsm')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="tel2_garant"  onChange={formik.handleChange}  value={formik.values.tel2_garant}   label={$t('nTlphoneGsm')} type="text" placeholder={$t('entrerTelGsm')}        className={inputClassName(formik?.errors?.tel2_garant)} />
                                                            <ErrorMessage name="tel2_garant" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('email')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="email_garant"  onChange={formik.handleChange}  value={formik.values.email_garant}   label={$t('email')} type="email" placeholder={$t('enterEmail')}        className={inputClassName(formik?.errors?.email_garant)} />
                                                            <ErrorMessage name="email_garant" component="span" className="p-error" />
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
                                                            {$t('tlBureau')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="tel_bureau"  onChange={formik.handleChange}  value={formik.values.tel_bureau}   label={$t('tlBureau')} type="text" placeholder={$t('enterTlBureau')}        className={inputClassName(formik?.errors?.tel_bureau)} />
                                                            <ErrorMessage name="tel_bureau" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('fax')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="fax"  onChange={formik.handleChange}  value={formik.values.fax}   label={$t('fax')} type="text" placeholder={$t('enterFax')}        className={inputClassName(formik?.errors?.fax)} />
                                                            <ErrorMessage name="fax" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('revenusMensuels')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="revenus_mensuels"  onChange={formik.handleChange}  value={formik.values.revenus_mensuels}   label={$t('revenusMensuels')} type="number" placeholder={$t('enterRevenusMensuels')}  min={0}  step="any"    className={inputClassName(formik?.errors?.revenus_mensuels)} />
                                                            <ErrorMessage name="revenus_mensuels" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></Fieldset>
                                            <Fieldset legend={$t('chambreSouhaitee')} toggleable>
                                                <div className="grid">
                                                    <div className="col-12">
                                                        <div className="formgrid grid">
                                                            <div className="col-12 md:col-3">
                                                                {$t('typeChambre')} 
                                                            </div>
                                                            <div className="col-12 md:col-9">
                                                                <DataSource   apiPath="components_data/id_type_chambre_option_list"  >
                                                                    {
                                                                    ({ response }) => 
                                                                    <>
                                                                    <Dropdown  name="id_type_chambre"     optionLabel="label" optionValue="value" value={formik.values.id_type_chambre} onChange={formik.handleChange} options={response} label={$t('typeChambre')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.id_type_chambre)}   />
                                                                    <ErrorMessage name="id_type_chambre" component="span" className="p-error" />
                                                                    </>
                                                                    }
                                                                </DataSource>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="formgrid grid">
                                                            <div className="col-12 md:col-3">
                                                                {$t('slctionnerOuEntrerLeNomDuBinomeSouhait')} 
                                                            </div>
                                                            <div className="col-12 md:col-9">
                                                                <InputText name="binome_souhaite"  onChange={formik.handleChange}  value={formik.values.binome_souhaite}   label={$t('slctionnerOuEntrerLeNomDuBinomeSouhait')} type="text" placeholder={$t('enterSlctionnerOuEntrerLeNomDuBinomeSouhait')}        className={inputClassName(formik?.errors?.binome_souhaite)} />
                                                                <DataSource   apiPath="components_data/binome_souhaite_option_list"  >
                                                                    {
                                                                    ({ response }) => 
                                                                    <>
                                                                    <datalist id="binome_souhaite_list">
                                                                    { response.map((option, index)=> <option key={index} value={option.value}>{option.label}</option>)}
                                                                    </datalist>
                                                                    </>
                                                                    }
                                                                </DataSource>
                                                                <ErrorMessage name="binome_souhaite" component="span" className="p-error" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="formgrid grid">
                                                            <div className="col-12 md:col-3">
                                                                {$t('cinDuBinme')} 
                                                            </div>
                                                            <div className="col-12 md:col-9">
                                                                <InputText name="cin_binome"  onChange={formik.handleChange}  value={formik.values.cin_binome}   label={$t('cinDuBinme')} type="text" placeholder={$t('enterCinDuBinme')}        className={inputClassName(formik?.errors?.cin_binome)} />
                                                                <DataSource   apiPath="components_data/cin_binome_option_list"  >
                                                                    {
                                                                    ({ response }) => 
                                                                    <>
                                                                    <datalist id="cin_binome_list">
                                                                    { response.map((option, index)=> <option key={index} value={option.value}>{option.label}</option>)}
                                                                    </datalist>
                                                                    </>
                                                                    }
                                                                </DataSource>
                                                                <ErrorMessage name="cin_binome" component="span" className="p-error" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div></Fieldset>
                                                <Fieldset legend={$t('dossierDeLaDemande')} toggleable>
                                                    <div className="grid">
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('codeDemande')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <InputText name="code_demande"  onChange={formik.handleChange}  value={formik.values.code_demande}   label={$t('codeDemande')} type="text" placeholder={$t('enterCodeDemande')}        className={inputClassName(formik?.errors?.code_demande)} />
                                                                    <ErrorMessage name="code_demande" component="span" className="p-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('etatDemande')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <InputText name="etat_demande"  onChange={formik.handleChange}  value={formik.values.etat_demande}   label={$t('etatDemande')} type="text" placeholder={$t('enterEtatDemande')}        className={inputClassName(formik?.errors?.etat_demande)} />
                                                                    <ErrorMessage name="etat_demande" component="span" className="p-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('uniteLocation')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <InputText name="id_unite_location"  onChange={formik.handleChange}  value={formik.values.id_unite_location}   label={$t('uniteLocation')} type="number" placeholder={$t('enterUniteLocation')}  min={0}  step="any"    className={inputClassName(formik?.errors?.id_unite_location)} />
                                                                    <ErrorMessage name="id_unite_location" component="span" className="p-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('dossier')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <DataSource   apiPath="components_data/id_dossier_option_list"  >
                                                                        {
                                                                        ({ response }) => 
                                                                        <>
                                                                        <Dropdown  name="id_dossier"     optionLabel="label" optionValue="value" value={formik.values.id_dossier} onChange={formik.handleChange} options={response} label={$t('dossier')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_dossier)}   />
                                                                        <ErrorMessage name="id_dossier" component="span" className="p-error" />
                                                                        </>
                                                                        }
                                                                    </DataSource>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('client')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <DataSource   apiPath="components_data/binome_souhaite_option_list"  >
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
                                                                    {$t('garant')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <DataSource   apiPath="components_data/id_garant_option_list"  >
                                                                        {
                                                                        ({ response }) => 
                                                                        <>
                                                                        <Dropdown  name="id_garant"     optionLabel="label" optionValue="value" value={formik.values.id_garant} onChange={formik.handleChange} options={response} label={$t('garant')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_garant)}   />
                                                                        <ErrorMessage name="id_garant" component="span" className="p-error" />
                                                                        </>
                                                                        }
                                                                    </DataSource>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('user')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <DataSource   apiPath="components_data/id_user_option_list"  >
                                                                        {
                                                                        ({ response }) => 
                                                                        <>
                                                                        <Dropdown  name="id_user"     optionLabel="label" optionValue="value" value={formik.values.id_user} onChange={formik.handleChange} options={response} label={$t('user')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_user)}   />
                                                                        <ErrorMessage name="id_user" component="span" className="p-error" />
                                                                        </>
                                                                        }
                                                                    </DataSource>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    {$t('idResidence')} 
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <InputText name="id_residence"  onChange={formik.handleChange}  value={formik.values.id_residence}   label={$t('idResidence')} type="number" placeholder={$t('enterIdResidence')}  min={0}  step="any"    className={inputClassName(formik?.errors?.id_residence)} />
                                                                    <ErrorMessage name="id_residence" component="span" className="p-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div></Fieldset>
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
DemandelogementAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'demandelogement',
	apiPath: 'demandelogement/add',
	routeName: 'demandelogementadd',
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
export default DemandelogementAddPage;
