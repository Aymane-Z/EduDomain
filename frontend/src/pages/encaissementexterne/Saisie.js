import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import React, { useContext, useEffect, useState } from 'react';
import useAddPage from 'hooks/useAddPage';
import SharedDataContext from 'components/SharedDataContext';
import useApi from 'hooks/useApi';
import useUtils from 'hooks/useUtils';

const EncaissementexterneSaisiePage = (props) => {
		const app = useApp();
        const api = useApi();
	const hide=1;
	//form validation rules
	const validationSchema = yup.object().shape({
		banque: yup.string().nullable().label($t('slctionnerLaBanqueDeVirement')),
		reference: yup.string().required().label($t('rferenceDuPaiement')),
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prnom')),
		recu: yup.string().required().label($t('reuDePaiement')),
		id_encaissement: yup.string().nullable().label($t('encaissement'))
	});
	const { sharedData } = useContext(SharedDataContext);
    const [demandeLogementId, setDemandeLogementId] = useState(null);
    const [urlform, seturlform] = useState(null);
    //get payment type
    const utils = useUtils();
    const [paymentType, setPaymentTypeState] = useState(utils.getPaymentType());

    
    useEffect(() => {
        if (paymentType=='FraisReservation'){
            if (sharedData && sharedData.length > 0) {
                const firstItem = sharedData[0];
                if (firstItem.demande_logement_id) {
                    setDemandeLogementId(firstItem.demande_logement_id); 
                    seturlform(`http://localhost:8060/create-checkout-session?next=/demandelogement/continue/${firstItem.demande_logement_id}&paymenttype=${paymentType}`);
                }
            }
        }
        else if (paymentType=='FraisLoyer'){
            seturlform(`http://localhost:8060/create-checkout-session?next=/home&paymenttype=${paymentType}`);
        }
        
    }, [sharedData,paymentType]);
    
	//form default values
	const formDefaultValues = {
		banque: '', 
		reference: '', 
		nom: '', 
		prenom: '', 
		recu: '', 
        id_encaissement: props.id
	}
    const handleRedirect = async () => {
        try{
            console.log(`/demandelogement/continue/${demandeLogementId}`);
            const checkoutsession = await api.post('/payment/create-checkout-session', {
				params: {
					next: `/demandelogement/continue/${demandeLogementId}`
				}
			});
        }
        catch (error){
            console.error('Error performing actions', error);
        }
        //app.navigate(`/demandelogement/continue/${demandeLogementId}`); // Adjust URL 
    };


    async function afterSubmitAct() {
        try {
            const firstItem = sharedData[0];
            if (paymentType=='FraisReservation'){
                const updateResponse = await api.post(`demandelogement/edit/${firstItem.demande_logement_id}`, {
                    etat_demande : 'payment FR en attente'
                });
            }
            else if (paymentType=='FraisLoyer'){
                
            }
            const updateResponse = await api.post(`demandelogement/edit/${firstItem.demande_logement_id}`, {
				etat_demande : 'payment FL en attente'
			});
			console.log('Update successful', updateResponse);
        } catch (error) {
            console.error('Error performing actions', error);
        }
    }



    const pageSectionStyle = {
        padding: '20px',
        background: '#f9f9f9'
    };

    const containerStyle = {
        maxWidth: '800px',
        margin: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        background: 'white',
        borderRadius: '10px'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        color: '#0056b3',
        textAlign: 'center',
        marginBottom: '20px'
    };

    const subtitleStyle = {
        fontSize: '1.5rem',
        color: '#772953',
        marginBottom: '10px'
    };

    const accordionHeaderStyle = {
        fontSize: '1.5rem',
        backgroundColor: '#772953',
        color: '#0d47a1',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
        marginTop: '10px'
    };
	
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
			app.navigate(`/index/paymentpending`);
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
<main id="EncaissementexterneSaisiePage" className="main-page">
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
        <div className="container-fluid">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                    
                                    <h2 style={subtitleStyle}>Choisissez votre méthode de paiement:</h2>
                                    <Accordion multiple>
                                    <AccordionTab headerClassName="custom-header" header="Paiement externe" headerStyle={accordionHeaderStyle}>
                                            <Card title="Informations de Paiement">
                                            <p>
                                            Effectuez votre paiement par virement bancaire en utilisant les détails ci-dessous. Après le paiement, fournissez la référence de votre transaction et téléchargez le reçu pour une confirmation rapide.
                                            </p>
                                            <p><strong>Montant à payer :</strong> {props.montant} MAD</p>
                                            <p><strong>RIB :</strong> FR76 1234 5678 9101 1121 3141 617</p>
                                            <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>async (values, actions) => {
                            submitForm(values);
                            await afterSubmitAct();
                            }}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('slctionnerUneBanque')} 
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <Dropdown  name="banque"     optionLabel="label" optionValue="value" value={formik.values.banque} onChange={formik.handleChange} options={app.menus.banque} label={$t('slctionnerUneBanque')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.banque)}   />
                                                <ErrorMessage name="banque" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('rferenceDuPaiement')} *
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <InputText name="reference"  onChange={formik.handleChange}  value={formik.values.reference}   label={$t('rferenceDuPaiement')} type="text" placeholder={$t('enterRferenceDuPaiement')}        className={inputClassName(formik?.errors?.reference)} />
                                                <ErrorMessage name="reference" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    { hide==0 &&
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('id encaissement')} *
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <InputText name="id encaissement"  onChange={formik.handleChange}  value={formik.values.id_encaissement}   label={$t('rferenceDuPaiement')} type="text" placeholder={$t('enterRferenceDuPaiement')}        className={inputClassName(formik?.errors?.id_encaissement)} />
                                                <ErrorMessage name="reference" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
    }
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('nom')} 
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <InputText name="nom"  onChange={formik.handleChange}  value={formik.values.nom}   label={$t('nom')} type="text" placeholder={$t('enterNom')}        className={inputClassName(formik?.errors?.nom)} />
                                                <ErrorMessage name="nom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('prnom')} 
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <InputText name="prenom"  onChange={formik.handleChange}  value={formik.values.prenom}   label={$t('prnom')} type="text" placeholder={$t('enterPrnom')}        className={inputClassName(formik?.errors?.prenom)} />
                                                <ErrorMessage name="prenom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-4">
                                                {$t('reuDePaiement')} *
                                            </div>
                                            <div className="col-12 md:col-6">
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
                            </Card>
                            </AccordionTab>
                            <AccordionTab headerClassName="custom-header" header="Payment par Carte Bancaire" headerStyle={accordionHeaderStyle}>
                                                <Card>
                                                    <div>Vous serez redirigé vers la page de paiement sécurisé. payment type : {paymentType}</div>
                                                    <hr/>
                                                    <form action={urlform} method="POST">
      
                                                    <input type="hidden" />
                                                        <Button id="checkout-and-portal-button" type="submit" label="Effectuer le paiement" className="p-button-primary"/>
                                                                    
                                                    </form>
                                                
                                                </Card>
                                                </AccordionTab>
                            </Accordion>
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
EncaissementexterneSaisiePage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissementexterne',
	apiPath: 'encaissementexterne/saisie',
	routeName: 'encaissementexternesaisie',
	submitButtonLabel: $t('soumettre'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('createRecord'),
	msgAfterSave: $t('demandeSaisieAvecSuccs'),
	msgBeforeSave: $t(''),
	showHeader: false,
	showFooter: true,
	redirect: true,
	isSubPage: true,
    montant: '',
    id : ''
}
export default EncaissementexterneSaisiePage;
