// Provision a TikTok bundle using the specified payment method
ProvisionTiktokBundle = async (payMethod) => {
    console.log("TIKTOK_URL", "=>", payMethod, "=>", this.msisdn);

    const uuid = `${moment().unix()}`; // Create a unique transaction ID using the current timestamp
    const transactionId = uuid;
    const token = `USERNAME_PLACEHOLDER${transactionId}`; // Placeholder for username
    const password = MD5(token).toString(); // Hash the token using MD5

    return new Promise(async (resolve, reject) => {
        try {
            const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
                                <methodCall>
                                    <methodName>subscribeService</methodName>
                                    <params>
                                        <param>
                                            <value>
                                                <struct>
                                                    <member>
                                                        <name>transactionId</name>
                                                        <value>
                                                            <string>${transactionId}</string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>msisdn</name>
                                                        <value>
                                                            <string>256${this.msisdn}</string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>benMsisdn</name>
                                                        <value>
                                                            <string></string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>bundleId</name>
                                                        <value>
                                                            <string>${productId}</string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>paySrc</name>
                                                        <value>
                                                            <string>${payMethod.toLowerCase()}</string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>senderId</name>
                                                        <value>
                                                            <string>SENDER_ID_PLACEHOLDER</string>
                                                        </value>
                                                    </member>
                                                    <member>
                                                        <name>password</name>
                                                        <value>
                                                            <string>${password}</string>
                                                        </value>
                                                    </member>
                                                </struct>
                                            </value>
                                        </param>
                                    </params>
                                </methodCall>`;
            
            var tikTokConfig = {
                headers: { "Content-Type": "application/xml; charset=utf-8" }, // Set the content type for the XML payload
            };

            const { data } = await axios.post("TIKTOK_URL", xmlPayload, tikTokConfig); // Make the POST request to subscribe to the TikTok service

            console.log("data is: ", JSON.stringify(data, null, 4));

            resolve(data);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};
