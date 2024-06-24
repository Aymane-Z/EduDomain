import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function EmailVerified() {
    
    return (<div className="grid justify-content-center">
        <div className="col-12 md:col-6">
            <div className="card text-center">
                <Avatar className="bg-green-500 text-white" icon="pi pi-check-circle" size="large" />
                <div className="text-2xl my-4 font-bold text-green-500">
                    {$t('emailVerificationCompleted')}
                </div>
                <hr />
                <Link to="/">
                    <Button icon="pi pi-home" label={$t('continue')} />
                </Link>
            </div>
        </div>
    </div>);
}
