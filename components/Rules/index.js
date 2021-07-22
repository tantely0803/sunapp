import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import { onlyiOS } from '../../utils/emojiIOS';
const Rules = (props) => {
    const [form, setForm] = useState({});

    return (
        <style.container
            style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}
        >
            <style.reduceContainer>
                <style.title>
                    Règles de la communauté {onlyiOS() ? '💪' : null}
                </style.title>
                <style.paragraph>
                    Une communauté se doit d’établir des règles pour que
                    l’expérience de chacun soit la plus sympa et sécurisée.
                    <style.breakline />
                    - La bienveillance prime sur tout. 💜
                    <style.breakline />
                    -Tu certifies avoir au moins 15 ans. ☀️
                    <style.breakline />
                    - Signale tous les comptes qui te semblent suspects. 😇
                    <style.breakline />
                    - Ne donne pas de conseils sur la prise médicamenteuses. 💊
                    <style.breakline />- Ne donne que de vraies informations
                    dans ton profil ! ✅
                    <style.breakline />- Lors de l’utilisation de cette
                    application, nous vous demanderons un accès à vos photos et
                    votre localisation. Mais pas de panique ! Cela est
                    nécessaire uniquement pour améliorer l’expérience de chacun
                    lors de l’utilisation de l’application SUNAPP 😁
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 1 : Objet
                    <style.breakline />
                    Les présentes « conditions générales d'utilisation » ont
                    pour objet l'encadrement juridique de l’utilisation de
                    l’application mobile SUN APP et de ses services.
                    <style.breakline />
                    Ce contrat est conclu entre :
                    <style.breakline />
                    Le gérant de l’application mobile, ci-après désigné
                    « l’Éditeur »,
                    <style.breakline />
                    Toute personne physique ou morale souhaitant accéder au site
                    et à ses services, ci-après appelé « l’Utilisateur ».
                    <style.breakline />
                    Les conditions générales d'utilisation doivent être
                    acceptées par tout Utilisateur, et son accès au site vaut
                    acceptation de ces conditions.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 2 : Mentions légales
                    <style.breakline />
                    Pour les personnes morales :
                    <style.breakline />
                    L’application mobile SUN APP est édité par la société SUN
                    APP, SASU au capital de 1500€, dont le siège social est
                    situé au 69bis-71 rue de la république 93100 Montreuil.
                    <style.breakline />
                    La société est représentée par Clément Parot
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 3 : Accès aux services
                    <style.breakline />
                    L’Utilisateur de l’application mobile SUN APP a accès aux
                    services suivants : SUNMAP, une carte interactive qui permet
                    à des personnes atteintes d’une pathologie chronique de
                    partager et d’échanger via une messagerie sécurisée.
                    <style.breakline />
                    Tout Utilisateur ayant accès a internet peut accéder
                    gratuitement et depuis n’importe où à l’application mobile.
                    Les frais supportés par l’Utilisateur pour y accéder
                    (connexion internet, matériel informatique, etc.) ne sont
                    pas à la charge de l’Éditeur.
                    <style.breakline />
                    L’application mobile SUN APP et ses différents services
                    peuvent être interrompus ou suspendus par l’Éditeur,
                    notamment à l’occasion d’une maintenance, sans obligation de
                    préavis ou de justification.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 4 : Responsabilité de l’Utilisateur
                    <style.breakline />
                    L'Utilisateur est responsable des risques liés à
                    l’utilisation de son identifiant de connexion et de son mot
                    de passe.
                    <style.breakline />
                    Le mot de passe de l’Utilisateur doit rester secret. En cas
                    de divulgation de mot de passe, l’Éditeur décline toute
                    responsabilité.
                    <style.breakline />
                    L’Utilisateur assume l’entière responsabilité de
                    l’utilisation qu’il fait des informations et contenus
                    présents sur l’application SUN APP.
                    <style.breakline />
                    L’âge légal « numérique » en France est de 15 ans, donc
                    l’Utilisateur affirme avoir au moins 15 ans. Ceci étant pour
                    pouvoir donner son consentement.
                    <style.breakline />
                    Tout usage du service par l'Utilisateur ayant directement ou
                    indirectement pour conséquence des dommages doit faire
                    l'objet d'une indemnisation au profit de l’application
                    mobile SUN APP.
                    <style.breakline />
                    Le site permet aux membres de publier sur l’application
                    mobile : Des évènements Des messages
                    <style.breakline />
                    Le membre s’engage à tenir des propos respectueux des autres
                    et de la loi et accepte que ces publications soient modérées
                    ou refusées par l’Éditeur, sans obligation de justification.
                    <style.breakline />
                    En publiant sur l’application mobile, l’Utilisateur cède à
                    la société éditrice le droit non exclusif et gratuit de
                    représenter, reproduire, adapter, modifier, diffuser et
                    distribuer sa publication, directement ou par un tiers
                    autorisé.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 5 : Responsabilité de l’Éditeur
                    <style.breakline />
                    Tout dysfonctionnement du serveur ou du réseau ne peut
                    engager la responsabilité de l’Éditeur.
                    <style.breakline />
                    De même, la responsabilité de l’application mobile ne peut
                    être engagée en cas de force majeure ou du fait imprévisible
                    et insurmontable d'un tiers.
                    <style.breakline />
                    L’application mobile SUN APP s'engage à mettre en œuvre tous
                    les moyens nécessaires pour garantir la sécurité et la
                    confidentialité des données. Toutefois, il n’apporte pas une
                    garantie de sécurité totale.
                    <style.breakline />
                    L’Éditeur se réserve la faculté d’une non-garantie de la
                    fiabilité des sources, bien que les informations diffusées
                    su le site soient réputées fiables.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 6 : Propriété intellectuelle
                    <style.breakline />
                    Les contenus de l’application mobile (logos, textes,
                    éléments graphiques, vidéos, etc.) son protégés par le droit
                    d’auteur, en vertu du Code de la propriété intellectuelle.
                    <style.breakline />
                    L’Utilisateur devra obtenir l’autorisation de l’éditeur du
                    site avant toute reproduction, copie ou publication de ces
                    différents contenus.
                    <style.breakline />
                    Ces derniers peuvent être utilisés par les utilisateurs à
                    des fins privées ; tout usage commercial est interdit.
                    <style.breakline />
                    L’Utilisateur est entièrement responsable de tout contenu
                    qu’il met en ligne et il s’engage à ne pas porter atteinte à
                    un tiers.
                    <style.breakline />
                    L’Éditeur de l’application mobile se réserve le droit de
                    modérer ou de supprimer librement et à tout moment les
                    contenus mis en ligne par les utilisateurs, et ce sans
                    justification.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 7 : Données personnelles
                    <style.breakline />
                    L’Utilisateur doit obligatoirement fournir des informations
                    personnelles pour procéder à son inscription sur le site.
                    <style.breakline />
                    L’adresse électronique (e-mail) de l’utilisateur pourra
                    notamment être utilisée par l’application mobile SUN APP
                    pour la communication d’informations diverses et la gestion
                    du compte.
                    <style.breakline />
                    L’application mobile SUN APP garantie le respect de la vie
                    privée de l’utilisateur, conformément à la loi n°78-17 du 6
                    janvier 1978 relative à l'informatique, aux fichiers et aux
                    libertés.
                    <style.breakline />
                    <style.breakline />
                    En vertu des articles 39 et 40 de la loi en date du 6
                    janvier 1978, l'Utilisateur dispose d'un droit d'accès, de
                    rectification, de suppression et d'opposition de ses données
                    personnelles. L'Utilisateur exerce ce droit via :
                    <style.breakline />
                    Son espace personnel sur l’application mobile ; Par mail à
                    contact@sunapp.fr;
                    <style.breakline />
                    Le responsable du traitement des données à caractère
                    personnel est : Clément Parot. Il peut être contacté par
                    e-mail à clement@sunapp.fr. Le responsable du traitement des
                    données est chargé de déterminer les finalités et les moyens
                    mis au service du traitement des données à caractère
                    personnel.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 8 : Liens hypertextes
                    <style.breakline />
                    Les domaines vers lesquels mènent les liens hypertextes
                    présents sur l’application mobile SUN APP n’engagent pas la
                    responsabilité de l’Éditeur de SUN APP, qui n’a pas de
                    contrôle sur ces liens.
                    <style.breakline />
                    Il est possible pour un tiers de créer un lien vers une page
                    de l’application mobile SUN APP sans autorisation expresse
                    de l’éditeur.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 9 : Évolution des conditions générales d’utilisation
                    <style.breakline />
                    L’application mobile SUN APP se réserve le droit de modifier
                    les clauses de ces conditions générales d’utilisation à tout
                    moment et sans justification.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 10 : Durée du contrat
                    <style.breakline />
                    La durée du présent contrat est indéterminée. Le contrat
                    produit ses effets à l'égard de l'Utilisateur à compter du
                    début de l’utilisation du service.
                </style.paragraph>
                <style.paragraph>
                    ARTICLE 11 : Droit applicable et juridiction compétente
                    <style.breakline />
                    Le présent contrat dépend de la législation française. En
                    cas de litige non résolu à l’amiable entre l’Utilisateur et
                    l’Éditeur, les tribunaux de Paris sont compétents pour
                    régler le contentieux.
                </style.paragraph>
                <Button
                    text="J'accepte"
                    onPress={() => props.navigation.navigate('Home')}
                />
                <style.breakline />
                <style.breakline />
                <style.breakline />
            </style.reduceContainer>
        </style.container>
    );
};

export default withNavigation(Rules);
