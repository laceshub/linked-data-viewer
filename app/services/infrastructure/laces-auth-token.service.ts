// SPDX-License-Identifier: Apache-2.0
// Copyright © 2018-2022 Semmtech B.V.

import * as jsrsasign from "jsrsasign";

export class LacesAuthTokenService {
    createToken(options: { url: string; privateKey: string; appId: string }) {
        try {
            const relativeUrl = this.relativeUrl(options.url);
            const signature = new jsrsasign.KJUR.crypto.Signature({
                alg: "SHA1withRSA",
                prov: "cryptojs/jsrsa"
            });
            const key = new jsrsasign.RSAKey();
            key.readPKCS8PrvKeyHex(jsrsasign.b64tohex(options.privateKey));
            signature.init(key);
            signature.updateString(relativeUrl);
            const signatureBase64 = jsrsasign.hextob64(signature.sign());
            const authorizationValue = `semmtech-app-token appId="${options.appId}", signature="${signatureBase64}"`;
            return authorizationValue;
        } catch (error) {
            console.error(error);
            throw new Error(
                "Error during creation of laces authentication token. Please check your credentials carefully."
            );
        }
    }

    relativeUrl(url: string) {
        const segments = url.split("/");
        let relativeUrl = "";
        for (
            let i = url.startsWith("http://") || url.startsWith("https://") ? 3 : 1;
            i < segments.length;
            i++
        ) {
            relativeUrl += "/" + segments[i];
        }
        return relativeUrl;
    }
}
