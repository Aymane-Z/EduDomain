import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import React, { useRef, useState } from "react";
import useEditPage from 'hooks/useEditPage';
import useApi from 'hooks/useApi';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';
const InfoscompdemandeContinuePage = (props) => {
		const app = useApp();
        const api = useApi();
        const stepperRef = useRef(null);
        const utils = useUtils();
        const currentDate = new Date().toISOString().slice(0, 10);
        const { user } = useAuth();
        const userId = user.id;
        const [selectedIdRes, setSelectedIdRes] = useState(null);
        const [selectedMontant, setSelectedMontant] = useState(null);
        const [selectedFactureId, setSelectedFactureId] = useState(null);
        const [selectedIdtypech, setSelectedIdtypech] = useState(null);
        const [selectedIdclient, setSelectedIdclient] = useState(null);
        const [selectedIdunitelocation, setSelectedIdunitelocation] = useState(null);
        const [paymentType, setPaymentTypeState] = useState(utils.getPaymentType());
	// form validation schema
	const validationSchema = yup.object().shape({
		ancienne_cite: yup.string().nullable().label($t('avezVousDjRsidDansUneCitUniversitaire')),
		periode_ancienne_cite: yup.string().nullable().label($t('periode')),
		source_decouverte: yup.string().nullable().label($t('commentAvezConnuNotreRsidence')),
		annee_residence_precedente: yup.string().nullable().label($t('avezVousDjRsidCetteRsidence')),
		type_chambre: yup.string().nullable().label($t('typeChambre')),
		numero_chambre: yup.string().nullable().label($t('numeroChambre')),
		groupe_sanguin: yup.string().nullable().label($t('groupeSanguin')),
		maladies_allergies: yup.string().nullable().label($t('maladiesEtAllergiesSignaler')),
		nom_contact_personne: yup.string().nullable().label($t('nomDeLaPersonneContacterEnCasDurgence')),
		tel_contact_personne: yup.string().nullable().label($t('tlphoneDeLaPersonneContacter')),
		id_demande_logement: yup.string().nullable().label($t('demandeLogement'))
	});
	// form default values
	const formDefaultValues = {
		ancienne_cite: '', 
		periode_ancienne_cite: '', 
		source_decouverte: '', 
		annee_residence_precedente: '', 
		type_chambre: '', 
		numero_chambre: '', 
		groupe_sanguin: '', 
		maladies_allergies: '', 
		nom_contact_personne: '', 
		tel_contact_personne: '', 
		id_demande_logement: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
    async function afterSubmitAct(response) {
        try {
            app.flashMsg(props.msgTitle, props.msgAfterSave);
            if (app.isDialogOpen()) {
                app.closeDialogs();
            } else if (props.redirect) {
                utils.setPaymentType('FraisLoyer');
	  		    setPaymentTypeState('FraisLoyer');
                const demandeResponse = await getdemande();
                const updateResponse = await api.post(`demandelogement/edit/${demandeResponse.data.id}`, {
                    etat_demande : 'en attente FL'
                });
                const selectedIdunitelocation = demandeResponse.data.id_unite_location;
                const selectedIdclient = demandeResponse.data.id_client;
                const selectedIdtypech = demandeResponse.data.id_type_chambre;
                const selectedIdRes = demandeResponse.data.id_residence;
                console.log("Typechambre id : ",selectedIdtypech," residence id : ",selectedIdRes)
                //const facturationResponse = await createFacturation(selectedIdunitelocation)
                //const facturationId = facturationResponse.data.id;
    
                const factureResponse = await createFacture(selectedIdclient,selectedIdunitelocation);
                const selectedFactureId = factureResponse.data.id;
    
                const baseTarifResponse = await fetchBaseTarification(selectedIdtypech,selectedIdRes);
                const selectedMontant = baseTarifResponse.data.montant;
    
                await createLineItem(selectedFactureId, baseTarifResponse.data);
                await updateUnitState(selectedIdunitelocation);
                const encaissement = await createEncaissement(selectedFactureId, selectedMontant, selectedIdunitelocation);
    
                console.log('All operations completed successfully.');
                app.navigate(`/encaissement/proceedpayment/recid/${encaissement.data.id}`);
            }
        } catch (error) {
            console.error('Failed to process steps:', error);
            // Handle the error appropriately
            app.flashMsg('Error', 'Operation failed, please try again');
        }
    }

    //functions for facture and payment
    function getdemande(){
        return api.get(`demandelogement/view/${formData.id_demande_logement}`);
    }
    function generateInvoiceCode(userId) {
		const date = new Date();
		const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
		const paddedUserId = userId.toString().padStart(4, '0'); 
		return `FAC-${dateString}-${paddedUserId}`;
	  }
	function generateLineItemCode(invoiceCode, lineItemNumber) {
		const paddedLineItemNumber = lineItemNumber.toString().padStart(4, '0'); // Pads the line item number to 4 digits
		return `${invoiceCode}-LI-${paddedLineItemNumber}`;
	  }

    function createFacturation(unite_location_id) {
        return api.post(`facturation/add`, {
            dt_facturation: currentDate,
            id_unite_location: unite_location_id,
            user_id: userId
        });
    }
    
    function createFacture(id_client,id_unite_location) {
        let codeFact = generateInvoiceCode(userId);
        return api.post('facture/add', {
                code: codeFact,
                dt_facture: currentDate,
                user_id: userId,
                id_client : id_client ,
                id_unite_location : id_unite_location
            });
        
    }
    
    function fetchBaseTarification(typechmabre_id, residence_id) {
        return api.get(`basetarification/fetch?codePrefix=FL&id_type_chambre=${typechmabre_id}&id_residence=${residence_id}`);
    }
    
    function createLineItem(factureId, baseTarifData, codeFact) {
        let codeLineFact = generateLineItemCode(codeFact, baseTarifData.id);
        return api.post(`lignesfacture/add`, {
            code: codeLineFact,
            designation: "Frais de loyer",
            description: "Frais de location pour un mois",
            montant: baseTarifData.montant,
            id_facture: factureId,
            id_base_tarif: baseTarifData.id
        });
    }
    
    function updateUnitState(id_unite_location) {
        return api.post('etatunite/updatestate', {
            etat: 'Réservée',
            description: 'Phase de paiement des frais de loyer',
            observation: 'Etat temporaire',
            id_unitelocation: id_unite_location
        });
    }
    
    function createEncaissement(factureId, montant, id_unite_location) {
        return api.post('encaissement/add', {
            observation: 'Frais de loyer',
            user_id: userId,
            montant: montant,
            id_facture: factureId,
            id_unite_location: id_unite_location,
            status : "en attente"
        });
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
<main id="InfoscompdemandeEditPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                
                <div className="col " >
                    <Title title={$t('Informations complémentaires :')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                            onSubmit={async (values, actions) => {
                            submitForm(values);
                            await afterSubmitAct();
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                                        <StepperPanel header="Informations complémentaires">
                                    <Fieldset legend={$t('informationsComplementaires')} toggleable>
                                        <div className="grid">
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('avezVousDjRsidDansUneCitUniversitaire')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="ancienne_cite"  onChange={formik.handleChange}  value={formik.values.ancienne_cite}   label={$t('avezVousDjRsidDansUneCitUniversitaire')} type="text" placeholder={$t('siOuiLaquelle')}        className={inputClassName(formik?.errors?.ancienne_cite)} />
                                                        <ErrorMessage name="ancienne_cite" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('periode')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputTextarea name="periode_ancienne_cite"  className={inputClassName(formik?.errors?.periode_ancienne_cite)}   value={formik.values.periode_ancienne_cite} placeholder={$t('aQuellePriode')} onChange={formik.handleChange}   >
                                                        </InputTextarea>
                                                        <ErrorMessage name="periode_ancienne_cite" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('commentAvezConnuNotreRsidence')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <div className="flex flex-wrap">
                                                            {
                                                            app.menus.sourceDecouverte.map((option) => {
                                                            return (
                                                            <div key={option.value} className="field-radiobutton  mx-3">
                                                                <RadioButton inputId={option.value} name="source_decouverte" value={option.value} onChange={formik.handleChange}  checked={formik.values.source_decouverte === option.value} className={inputClassName(formik?.errors?.source_decouverte, '')} />
                                                                <label htmlFor={option.value}>{option.label}</label>
                                                            </div>
                                                            )
                                                            })
                                                            }
                                                        </div>
                                                        <ErrorMessage name="source_decouverte" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('avezVousDjRsidCetteRsidence')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="annee_residence_precedente"  onChange={formik.handleChange}  value={formik.values.annee_residence_precedente}   label={$t('avezVousDjRsidCetteRsidence')} type="text" placeholder={$t('siOuiAnne')}        className={inputClassName(formik?.errors?.annee_residence_precedente)} />
                                                        <ErrorMessage name="annee_residence_precedente" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('typeChambre')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="type_chambre"  onChange={formik.handleChange}  value={formik.values.type_chambre}   label={$t('typeChambre')} type="text" placeholder={$t('entrerTypeAncienneChambre')}        className={inputClassName(formik?.errors?.type_chambre)} />
                                                        <ErrorMessage name="type_chambre" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('numeroChambre')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="numero_chambre"  onChange={formik.handleChange}  value={formik.values.numero_chambre}   label={$t('numeroChambre')} type="text" placeholder={$t('entrerNumeroAncienneChambre')}        className={inputClassName(formik?.errors?.numero_chambre)} />
                                                        <ErrorMessage name="numero_chambre" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div></Fieldset>
                                        <div className="flex pt-4 justify-content-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
                                                </StepperPanel>
                                                <StepperPanel header="En Cas d'Urgence">
                                        <Fieldset legend={$t('enCasDUrgence')} toggleable>
                                            <div className="grid">
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('groupeSanguin')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="groupe_sanguin"  onChange={formik.handleChange}  value={formik.values.groupe_sanguin}   label={$t('groupeSanguin')} type="text" placeholder={$t('enterGroupeSanguin')}        className={inputClassName(formik?.errors?.groupe_sanguin)} />
                                                            <ErrorMessage name="groupe_sanguin" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('maladiesEtAllergiesSignaler')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="maladies_allergies"  onChange={formik.handleChange}  value={formik.values.maladies_allergies}   label={$t('maladiesEtAllergiesSignaler')} type="text" placeholder={$t('enterMaladiesEtAllergies')}        className={inputClassName(formik?.errors?.maladies_allergies)} />
                                                            <ErrorMessage name="maladies_allergies" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('nomDeLaPersonneContacterEnCasDurgence')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="nom_contact_personne"  onChange={formik.handleChange}  value={formik.values.nom_contact_personne}   label={$t('nomDeLaPersonneContacterEnCasDurgence')} type="text" placeholder={$t('enterNomEtPrenom')}        className={inputClassName(formik?.errors?.nom_contact_personne)} />
                                                            <ErrorMessage name="nom_contact_personne" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('tlphoneDeLaPersonneContacter')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <InputText name="tel_contact_personne"  onChange={formik.handleChange}  value={formik.values.tel_contact_personne}   label={$t('tlphoneDeLaPersonneContacter')} type="text" placeholder={$t('enterTlphoneDeLaPersonneContacter')}        className={inputClassName(formik?.errors?.tel_contact_personne)} />
                                                            <ErrorMessage name="tel_contact_personne" component="span" className="p-error" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="formgrid grid">
                                                        <div className="col-12 md:col-3">
                                                            {$t('demandeLogement')} 
                                                        </div>
                                                        <div className="col-12 md:col-9">
                                                            <DataSource   apiPath="components_data/id_demande_logement_option_list"  >
                                                                {
                                                                ({ response }) => 
                                                                <>
                                                                <Dropdown  name="id_demande_logement"     optionLabel="label" optionValue="value" value={formik.values.id_demande_logement} onChange={formik.handleChange} options={response} label={$t('demandeLogement')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.id_demande_logement)}   />
                                                                <ErrorMessage name="id_demande_logement" component="span" className="p-error" />
                                                                </>
                                                                }
                                                            </DataSource>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></Fieldset>
                                            <div className="flex pt-4 justify-content-start">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                </div>
                { props.showFooter && 
                                                        <div className="text-center my-3">
                                                            <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label={$t('submit')} icon="pi pi-send" loading={saving} />
                                                        </div>
                                                        }</StepperPanel></Stepper>
                                        </div>
                                        
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
InfoscompdemandeContinuePage.defaultProps = {
	primaryKey: 'id',
	pageName: 'infoscompdemande',
	apiPath: 'infoscompdemande/edit',
	routeName: 'infoscompdemandeedit',
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
export default InfoscompdemandeContinuePage;

//page props and default values

