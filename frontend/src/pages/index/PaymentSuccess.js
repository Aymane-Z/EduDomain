// src/PaymentSuccess.js
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useUtils from 'hooks/useUtils';
import useApi from 'hooks/useApi';
import { useState } from "react";
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const utils = useUtils();
    const api = useApi();
    const [demandelogement, setDemandelogementState] = useState(utils.getDemandelogement());
    

    
    const query = useQuery();
    const next = query.get('next');
    const paymentType = query.get('paymentType');
    console.log("the next url : ",next);
    
    const handleContinue = async () => {
        const demandeResponse = await getdemande(demandelogement);
        if (paymentType=='FraisReservation'){
            //update demande de logement 
            const updateResponse = await api.post(`demandelogement/edit/${demandelogement}`, {
				etat_demande : 'validee',
			});
			console.log('Update request successful', updateResponse);
            const etatunite = await api.post('etatunite/updatestate',{
                etat : 'Pré-Reservée',
                description : 'Paiement des frais de reservation Validés',
                observation : '',
                id_unitelocation : demandeResponse.data.id_unite_location
            });
            console.log('Etat Added successfully', etatunite);
        }
        else if( paymentType=='FraisLoyer'){
            //create garant/garantie - update client - create dossierlocation/contrat - change user role to client
            const updateResponse = await api.post(`demandelogement/edit/${demandelogement}`, {
				etat_demande : 'client effectif',
			});
			console.log('Update request successful', updateResponse);


            const assignunit = await api.post('demandelogement/assignunit',{
                id_demande_logement : demandelogement
            });

            console.log('Assign unit successful', assignunit);

            const etatunite = await api.post('etatunite/updatestate',{
                etat : 'Reservée',
                description : 'Paiement des frais de Loyer Validés',
                observation : '',
                id_unitelocation : demandeResponse.data.id_unite_location
            });
            console.log('Etat Added successfully', etatunite);
            
        }
        if (next){
            navigate(next);
        }
        else{
            navigate('/home');
        }
        
    };

    function getdemande(id_demande_logement){
        return api.get(`demandelogement/view/${id_demande_logement}`);
    }


    return (
        <div className="grid justify-content-center" >
        <div className="col-12 md:col-6" style={{ width: '350px', textAlign: 'center' }}>
            <div className="card">
                <i className="pi pi-check-circle" style={{ fontSize: '4em', color: 'green' }}></i>
                <h1 className="text-xl mt-5 text-green-600">Payment Successful!</h1>
                <p>Your payment has been processed successfully.</p>
                <Button label="Continue" icon="pi pi-arrow-right" className="p-button-success" onClick={handleContinue} />
            </div>
        </div>
        </div>
    );
};

export default PaymentSuccess;
