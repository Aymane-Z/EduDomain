import { Formik, Form, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataSource } from 'components/DataSource';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import EncaissementexterneAddPage from 'pages/encaissementexterne/Saisie';
import EncaissementPaiementdetailsPage from 'pages/encaissement/Paiementdetails';
import useApp from 'hooks/useApp';
import { Title } from 'components/Title';
import useEditPage from 'hooks/useEditPage';
import React, { useState, useContext, createContext } from 'react';
import MasterDetailPages from './MasterDetailPages';
import SharedDataContext from 'components/SharedDataContext';



const EncaissementPaiementPage = (props) => {
		const app = useApp();
	const location = useLocation();
	// form validation schema
	const validationSchema = yup.object().shape({
		montant: yup.number().nullable().label($t('montant')),
		id_facture: yup.number().nullable().label($t('facture')),
		id_unite_location: yup.number().nullable().label($t('uniteDeLocation'))
	});
	// form default values
	const formDefaultValues = {
		montant: '', 
		id_facture: '', 
		id_unite_location: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, currentRecord, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	
    
    const [sharedData, setsharedData] = useState("");
    
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

	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="EncaissementPaiementPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title={$t('Paiement')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                <hr/>
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container-fluid">
            <div className="grid ">
            <SharedDataContext.Provider value={{ sharedData, setsharedData }}>
                <div className="col-12 md:col-3 lg:col-3 p-fluid" >
                    <div className="">
                        { pageReady &&
                        <EncaissementPaiementdetailsPage isSubPage  limit="10" fieldName="recid" fieldValue={formData.id} showHeader={false} showBreadcrumbs={false} showFooter={false} paginate={false} >
                        </EncaissementPaiementdetailsPage>
                        }
                    </div>
                </div>
                <div className="col-12 md:col-8 lg:col-8 p-fluid" >
                    <div className="card">
                            { pageReady &&
                            <EncaissementexterneAddPage isSubPage  showHeader={false} id={formData.id} montant={formData.montant} pageData={{id_encaissement: formData.id}} >
                            </EncaissementexterneAddPage>
                            }
                    </div>
                </div>
                </SharedDataContext.Provider>
                            </div>
                        </div>
                    </section>
                </main>
		);
	}
}
EncaissementPaiementPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/paiement',
	routeName: 'encaissementpaiement',
	submitButtonLabel: $t('soumettre'),
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
export default EncaissementPaiementPage;
