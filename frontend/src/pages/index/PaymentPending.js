import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';

export default function PaymentPending() {
    
    return (
        <div className="grid justify-content-center">
            <div className="col-12 md:col-6">
                <div className="card">
                    <Avatar className="bg-green-500 text-white" icon="pi pi-check-circle" size="large" style={{ marginTop: '2rem' }} />
                    <h2 className="text-lg mt-4 text-green-600">
                        {$t('Demande soumise avec succès')}
                    </h2>
                    <p className="text-sm my-2 text-gray-600">
                        {$t('Votre demande de location a été soumise avec succès.')}
                    </p>
                    <p className="text-sm mb-4 text-gray-600">
                        {$t('Le paiement sera vérifié sous un délai maximal de ')} <strong>{$t('48 heures ouvrables ')}</strong>{$t('pour poursuivre la demande de location.')}
                    </p>
                    <p className="text-sm mb-4 text-gray-600">
                        {$t('Vous serez notifié par email pour vous connecter et continuer la procédure.')}
                    </p>
                    <hr className="mb-4" />
                </div>
            </div>
        </div>
    );
}
