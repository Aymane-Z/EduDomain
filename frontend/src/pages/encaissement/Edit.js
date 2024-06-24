import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import EncaissementexterneAddPage from 'pages/encaissementexterne/Add';
import EncaissementViewPage from 'pages/encaissement/View';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const EncaissementEditPage = (props) => {
		const app = useApp();
	const location = useLocation();
	// form validation schema
	const validationSchema = yup.object().shape({
		date: yup.string().nullable().label($t('date')),
		montant: yup.number().nullable().label($t('montant')),
		observation: yup.string().nullable().label($t('observation')),
		id_client: yup.string().nullable().label($t('client')),
		user_id: yup.string().nullable().label($t('user')),
		id_facture: yup.string().nullable().label($t('facture')),
		id_unite_location: yup.string().nullable().label($t('uniteDeLocation')),
		status: yup.number().nullable().label($t('status'))
	});
	// form default values
	const formDefaultValues = {
		date: new Date(), 
		montant: '', 
		observation: '', 
		id_client: '', 
		user_id: '', 
		id_facture: '', 
		id_unite_location: '', 
		status: "NULL", 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { pageReady, loading, apiRequestError } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/encaissement`);
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
const handleRedirect = () => {
        window.location.href = "/payment-processing"; // Adjust URL 
    };
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
        fontSize: '1.8rem',
        color: '#004085',
        marginBottom: '10px'
    };
    const accordionHeaderStyle = {
        fontSize: '1.5rem',
        backgroundColor: '#e3f2fd',
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
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="EncaissementEditPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col-sm-4 col-md-4 col-12 comp-grid" >
                    <div className="">
                        { pageReady &&
                        <EncaissementViewPage isSubPage  id={props.id} showHeader={true} >
                        </EncaissementViewPage>
                        }
                    </div>
                </div>
                <div className="col-12 comp-grid" >
                    <div className="">
                        { pageReady &&
                        <EncaissementexterneAddPage isSubPage  showHeader={true} pageData={{id_encaissement: props.id}} >
                        </EncaissementexterneAddPage>
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div className="">
                        <>
                        <section style={pageSectionStyle}>
                            <div style={containerStyle}>
                                <h1 style={titleStyle}>Payment En ligne</h1>
                            </div>
                        </section>
                        <section style={pageSectionStyle}>
                            <div style={containerStyle} id="payment-form">
                                <h2 style={subtitleStyle}>Choisissez votre méthode de paiement:</h2>
                                <Accordion multiple>
                                    <AccordionTab headerClassName="custom-header" header="Paiement externe" headerStyle={accordionHeaderStyle}>
                                        <Card title="Informations de Paiement">
                                        <p>
                                        Effectuez votre paiement par virement bancaire en utilisant les détails ci-dessous. Après le paiement, fournissez la référence de votre transaction et téléchargez le reçu pour une confirmation rapide.
                                        </p>
                                        <p><strong>Montant à payer :</strong> XXXX MAD</p>
                                        <p><strong>RIB :</strong> FR76 1234 5678 9101 1121 3141 617</p>
                                        <InputText placeholder="Référence de paiement" />
                                        <FileUpload mode="basic" name="receipt" accept="image/*" maxFileSize={10000000} />
                                        <Button label="Soumettre" style={buttonStyle} />
                                        </Card>
                                        </AccordionTab>
                                        <AccordionTab headerClassName="custom-header" header="Payment par Carte Bancaire" headerStyle={accordionHeaderStyle}>
                                            <Card>
                                            <Button label="Effectuer le paiement" style={buttonStyle} onClick={handleRedirect} />
                                            </Card>
                                            </AccordionTab>
                                            </Accordion>
                                        </div>
                                    </section>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
		);
	}
}
EncaissementEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/edit',
	routeName: 'encaissementedit',
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
export default EncaissementEditPage;
