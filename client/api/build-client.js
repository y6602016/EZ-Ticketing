import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server since window object only exists on a browser
    // request should be made to  http://ingress-nginx.ingress....
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we sre on the browser
    // request can be made with a vase url of "" (no need of domain)
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
