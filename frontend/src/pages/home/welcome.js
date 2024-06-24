import React from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const sharedClasses = {
    textCenter: 'text-center',
    mxAuto: 'mx-auto',
    mt2: 'mt-2',
    mt4: 'mt-4',
    mt8: 'mt-8',
    px4: 'px-4',
    py3: 'py-3',
    py8: 'py-8',
    py16: 'py-16',
    gridCols1: 'grid-cols-1',
    gridCols2: 'grid-cols-2',
    gridCols3: 'grid-cols-3',
    gridCols4: 'grid-cols-4',
    gap4: 'gap-4',
    gap8: 'gap-8',
    bgZinc100: 'bg-zinc-100',
    bgZinc800: 'dark:bg-zinc-800',
    textZinc200: 'dark:text-zinc-200',
    textZinc800: 'text-zinc-800',
    textBlue600: 'text-blue-600',
    textGreen600: 'text-green-600',
    bgBlue600: 'bg-blue-600',
    bgWhite: 'bg-white',
    textWhite: 'text-white',
    roundedLg: 'rounded-lg',
    fontBold: 'font-bold',
    fontSemibold: 'font-semibold',
    wFull: 'w-full',
    hFull: 'h-full',
    objectCover: 'object-cover',
    absolute: 'absolute',
    bottom0: 'bottom-0',
    left0: 'left-0',
    bgBlack: 'bg-black',
    bgOpacity50: 'bg-opacity-50',
    textBlack: 'text-black',
    p4: 'p-4',
    grid: 'grid',
    mdGrid: 'md:grid',
    textXl: 'text-xl',
    text3xl: 'text-3xl',
    text4xl: 'text-4xl',
    w150px: 'w-[150px]',
    h150px: 'h-[150px]',
    w300px: 'w-[300px]',
    h200px: 'h-[200px]',
    w50px: 'w-[50px]',
    h50px: 'h-[50px]'
};

const WelcomePage = () => {
    const history = useNavigate();
    const onClick = () =>{
        history(`/home/reservation`);
    }
  return (
<div className={`${sharedClasses.bgWhite} ${sharedClasses.textZinc800} ${sharedClasses.bgZinc800} ${sharedClasses.textZinc200}`}>
      <section className={`${sharedClasses.textCenter} ${sharedClasses.py16}`}>
        <h1 className={`${sharedClasses.text4xl} ${sharedClasses.fontBold} ${sharedClasses.textBlue600}`}>Résidence au cœur de Al Irfane</h1>
        <p className={`${sharedClasses.mt4} max-w-2xl ${sharedClasses.mxAuto}`}>La Résidence Universitaire EduDomain met à la disposition de ses résidents un cadre de vie confortable, chaleureux, sain et sécurisé. EduDomain vous offre un hébergement adapté à vos besoins et à votre budget.</p>
        <Button label="Commencer votre réservation" onClick={() => onClick() } className={`${sharedClasses.mt8} ${sharedClasses.bgBlue600} ${sharedClasses.textWhite} ${sharedClasses.px4} ${sharedClasses.py3} ${sharedClasses.roundedLg}`} />
      </section>
      
      <section className={`${sharedClasses.grid} ${sharedClasses.gridCols2} ${sharedClasses.mdGrid} ${sharedClasses.gridCols4} ${sharedClasses.gap4} ${sharedClasses.px4} ${sharedClasses.py8}`}>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/double1.jpg" width="150" height="150" alt="Chambre double" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Chambre double</p>
        </div>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/individuelle.jpg" width="150" height="150" alt="Chambre Individuelle" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Chambre Single</p>
        </div>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/mobilite_reduite.jpg" width="150" height="150" alt="Chambre PMR" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Chambre PMR</p>
        </div>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/superette.png" width="150" height="150" alt="Superette" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Superette</p>
        </div>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/pharmacie.jpg" width="150" height="150" alt="Pharmacie" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Pharmacie</p>
        </div>
        <div className={sharedClasses.textCenter}>
          <Image src="/images/welcome/jeux.jpeg" width="150" height="150" alt="Espace de jeux" className={`${sharedClasses.mxAuto} ${sharedClasses.w150px} ${sharedClasses.h150px}`} />
          <p className={sharedClasses.mt2}>Espace de jeux</p>
        </div>
      </section>
      
      <section className={`${sharedClasses.bgZinc100} ${sharedClasses.bgZinc800} ${sharedClasses.py16} ${sharedClasses.textCenter} ${sharedClasses.py16}`}>
        <h2 className={`${sharedClasses.textCenter} ${sharedClasses.text3xl} ${sharedClasses.fontBold} ${sharedClasses.textGreen600}`}>Nos types de chambres</h2>
        <p className={`${sharedClasses.textCenter} ${sharedClasses.textXl} ${sharedClasses.mt4}`}>EduDomain OFFRE 3 TYPES DE CHAMBRES</p>
        <div className={`${sharedClasses.grid} ${sharedClasses.gridCols1} ${sharedClasses.mdGrid} ${sharedClasses.gridCols3} ${sharedClasses.gap8} ${sharedClasses.px4} ${sharedClasses.py8}`}>
          <Card className="relative shadow-lg rounded overflow-hidden">
            <Image src="/images/welcome/single.jpg" width="300" height="200" alt="Chambre Single" preview={false} className={`${sharedClasses.wFull} ${sharedClasses.h200px} ${sharedClasses.objectCover}`} />
            <div className={`${sharedClasses.absolute} ${sharedClasses.bottom0} ${sharedClasses.left0} ${sharedClasses.bgBlack} ${sharedClasses.bgOpacity50} ${sharedClasses.textWhite} ${sharedClasses.p4}`}>
              <h3>Chambre Single</h3>
              <p>DETAILS</p>
            </div>
          </Card>
          <Card className="relative shadow-lg rounded overflow-hidden">
            <Image src="/images/welcome/double.jpg" width="300" height="200" alt="Chambre Double" preview={false} className={`${sharedClasses.wFull} ${sharedClasses.h200px} ${sharedClasses.objectCover}`} />
            <div className={`${sharedClasses.absolute} ${sharedClasses.bottom0} ${sharedClasses.left0} ${sharedClasses.bgBlack} ${sharedClasses.bgOpacity50} ${sharedClasses.textWhite} ${sharedClasses.p4}`}>
              <h3>Chambre Double</h3>
              <p>DETAILS</p>
            </div>
          </Card>
          <Card className="relative shadow-lg rounded overflow-hidden">
            <Image src="/images/welcome/pmr.jpg" width="300" height="200" alt="Chambre PMR" preview={false} className={`${sharedClasses.wFull} ${sharedClasses.h200px} ${sharedClasses.objectCover}`} />
            <div className={`${sharedClasses.absolute} ${sharedClasses.bottom0} ${sharedClasses.left0} ${sharedClasses.bgBlack} ${sharedClasses.bgOpacity50} ${sharedClasses.textWhite} ${sharedClasses.p4}`}>
              <h3>Chambre pour les personnes à mobilité réduite</h3>
              <p>DETAILS</p>
            </div>
          </Card>
        </div>
      </section>
      
      <section className={sharedClasses.py16}>
        <div className={` ${sharedClasses.gridCols1} ${sharedClasses.mdGrid} ${sharedClasses.gridCols2} ${sharedClasses.gap8} ${sharedClasses.px4} ${sharedClasses.py8}`}>
          <div className={sharedClasses.textCenter}>
            <h3 className={`${sharedClasses.textXl} ${sharedClasses.fontSemibold}`}>LOGEMENT</h3>
            <p className={sharedClasses.mt2}>EduDomain dispose de 1009 chambres simples ou doubles entièrement équipées et aux meilleurs standards. Toutes les chambres disposent de plusieurs équipements: Salle de bain Espace kitchenette avec réfrigérateur et l’élément de qualité bureau avec étagère Placard, table individuelle...</p>
            <Image src="/images/welcome/double.jpg" width="300" height="200" alt="Logement" className={`${sharedClasses.mxAuto} ${sharedClasses.mt4} ${sharedClasses.w300px} ${sharedClasses.h200px}`} />
          </div>
          <div className={sharedClasses.textCenter}>
            <h3 className={`${sharedClasses.textXl} ${sharedClasses.fontSemibold}`}>PHARMACIE</h3>
            <p className={sharedClasses.mt2}>Une pharmacie moderne avec un large choix de produits permet aux résidents de répondre à tous leurs besoins en matière de santé et de bien-être</p>
            <Image src="/images/welcome/pharmacie.jpg" width="300" height="200" alt="Superette" className={`${sharedClasses.mxAuto} ${sharedClasses.mt4} ${sharedClasses.w300px} ${sharedClasses.h200px}`} />
          </div>
          <div className={sharedClasses.textCenter}>
            <h3 className={`${sharedClasses.textXl} ${sharedClasses.fontSemibold}`}>LOISIRS</h3>
            <p className={sharedClasses.mt2}>Notre campus est équipé d’une salle de jeux ainsi que d’autres points dédiés aux loisirs</p>
            <Image src="/images/welcome/jeux.jpeg" width="300" height="200" alt="Loisirs" className={`${sharedClasses.mxAuto} ${sharedClasses.mt4} ${sharedClasses.w300px} ${sharedClasses.h200px}`} />
          </div>
          <div className={sharedClasses.textCenter}>
            <h3 className={`${sharedClasses.textXl} ${sharedClasses.fontSemibold}`}>SALLE ETUDES</h3>
            <p className={sharedClasses.mt2}>Une salle d'études moderne, équipée de toutes les commodités nécessaires, permet aux résidents de se concentrer et de travailler efficacement</p>
            <Image src="/images/welcome/salleetudes.jpg" width="300" height="200" alt="Salle d'Etudes" className={`${sharedClasses.mxAuto} ${sharedClasses.mt4} ${sharedClasses.w300px} ${sharedClasses.h200px}`} />
          </div>
        </div>
      </section>
      
      <section className={`${sharedClasses.bgZinc100} ${sharedClasses.bgZinc800} ${sharedClasses.py16}`}>
        <h2 className={`${sharedClasses.textCenter} ${sharedClasses.text3xl} ${sharedClasses.fontBold} ${sharedClasses.textGreen600}`}>Pourquoi choisir notre résidence?</h2>
        <div className={`${sharedClasses.grid} ${sharedClasses.gridCols1} ${sharedClasses.mdGrid} ${sharedClasses.gridCols3} ${sharedClasses.gap8} ${sharedClasses.px4} ${sharedClasses.py8}`}>
          <div className={sharedClasses.textCenter}>
            <Image src="/images/welcome/chambreagreables.png" width="50" height="50" alt="Chambres agréables" className={`${sharedClasses.mxAuto} ${sharedClasses.w50px} ${sharedClasses.h50px}`} />
            <h3 className={`${sharedClasses.mt2} ${sharedClasses.fontSemibold}`}>Chambres agréables</h3>
            <p className={sharedClasses.mt2}>Chambres modernes, spacieuses et agréables dans un cadre sain.</p>
          </div>
          <div className={sharedClasses.textCenter}>
            <Image src="/images/welcome/services_icon.png" width="50" height="50" alt="Services" className={`${sharedClasses.mxAuto} ${sharedClasses.w50px} ${sharedClasses.h50px}`} />
            <h3 className={`${sharedClasses.mt2} ${sharedClasses.fontSemibold}`}>Services</h3>
            <p className={sharedClasses.mt2}>Le campus offre plein de services (Accès internet, Salle de foyer, Salle de jeux, Superette...)</p>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default WelcomePage;

