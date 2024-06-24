import React, { useContext, useEffect } from 'react';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { Title } from 'components/Title';
import useUtils from 'hooks/useUtils';
import SharedDataContext from 'components/SharedDataContext';
import useListPage from 'hooks/useListPage';
import useApp from 'hooks/useApp';

const EncaissementProceedPage = (props) => {
    const utils = useUtils();
    const pageController = useListPage(props);
    const { records, apiRequestError } = pageController;
    const app = useApp();

    if (apiRequestError) {
        return <PageRequestError error={apiRequestError} />;
    }

    return (
        <main id="EncaissementProceedPage" className="main-page">
            <section className="page-section mb-3">
                <div className="container-fluid">
                    <div className="grid justify-content-between align-items-center">
                        <div className="col">
                            <Title title={$t('encaissement')} titleClass="text-2xl text-primary font-bold" />
                        </div>
                        <div className="col-12 md:col-3">
                            
                        </div>
                    </div>
                </div>
            </section>

            <section className="page-section">
                <div className="container" >
                    <div className="grid">
                        <div className="col-10 comp-grid">
                            {records.map((data, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="mb-5 grid align-items-center">
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('Code Demande :')}</div>
                                            <div><br></br></div>
                                            <div className=" font-bold">{data.demande_logement_code_demande}</div>
                                        </div>
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('Unité de location choisie :')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{data.unitelocationdetails_code}</div>
                                        </div>
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('Type chambre :')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{data.famille_unite_type}</div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="mb-5 grid align-items-center">
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('nom')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{data.usersnode_nom}</div>
                                        </div>
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('prenom')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{data.usersnode_prenom}</div>
                                        </div>
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('nCin')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{data.usersnode_cin}</div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="mb-5 grid align-items-center">
                                        <div className="col">
                                            <div className="text-400 font-medium mb-1">{$t('Prix de Loyer par mois :')}</div>
                                            <div><br></br></div>
                                            <div className="font-bold">{utils.currency(data.famille_unite_prix, 'MAD', 2)}</div>
                                        </div>
                                        </div>
                                    <hr/>
                                    <div className="mb-5 grid align-items-center">
                                        <div className="col">
                                            <div className="text-lg font-semibold text-align-center text-green-600">{$t('MONTANT A PAYER :')}</div>
                                            <div><br></br></div>
                                            <div className="text-2xl font-bold text-align-center text-green-700">{utils.currency(data.encaissement_montant, 'MAD', 2)}</div>
                                        </div>
                                    </div>
                                    <Button label={$t('Procédez au paiement')} className="p-button-success p-button-rounded" onClick={() => { app.navigate(`/encaissement/paiement/${data.encaissement_id}`); }}/>
                                </div>
                                
                                
                            ))}
                            
                        </div>
                    </div>
                    
                </div>
            </section>
        </main>
    );
}

EncaissementProceedPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'encaissement',
	apiPath: 'encaissement/paiementdetails',
	routeName: 'encaissementpaiementdetails',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: false,
	importData: false,
	keepRecords: true,
	multiCheckbox: false,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
};

export default EncaissementProceedPage;