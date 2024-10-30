// Provision a bundle using the given bundleId, payment method, and type
ProvisionGagaBundle = async (bundleId, payMethod, type) => {
    console.log("GAGA_URL", "=>", bundleId, "=>", this.msisdn, "=>", type, "=>", payMethod);
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post(
                "https://api.example.com/v1/ayoba/purchase", // API endpoint for purchasing a bundle
                {
                    id: this.msisdn,
                    beneficiary: this.msisdn,
                    bundle: bundleId,
                    payment_method: payMethod.toLowerCase(),
                    type: type,
                },
                {
                    headers: {
                        Accept: "application/json",
                        source: "web",
                    },
                }
            );

            console.log("data is: ", JSON.stringify(data, null, 4));

            resolve(data);
        } catch (err) {
            console.log("Error: ", err);
            reject(err);
        }
    });
};
