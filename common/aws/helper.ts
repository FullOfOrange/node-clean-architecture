export function SQS(queueName) {
    if (!queueName) throw new Error("Invalid queue name");
    return Object.keys(this).reduce((proxy, key) => {
        proxy[key] = this[key].bind(SQS, queueName); // eslint-disable-line no-param-reassign
        return proxy;
    });
}

SQS.getUrl = function getUrl(queueName) {
    const {
        NODE_ENV, AWS_DEPLOY_REGION, AWS_ACCOUNT_ID,
    } = process.env;

    const fullName = [NODE_ENV, "sqs", queueName].join("-");

    if (NODE_ENV === "development") {
        return [
            "http://localhost:9324",
            "queue",
            fullName,
        ].join("/");
    }

    return [
        `https://sqs.${AWS_DEPLOY_REGION}.amazonaws.com`,
        AWS_ACCOUNT_ID,
        fullName,
    ].join("/");
};