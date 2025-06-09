import { createThirdwebClient } from "thirdweb";

const clientId = "816ab255dd4019069f7df4c5aafa492a"; // Hardcoded Client ID
const secretKey = "aAOLBTTkGSYicJEDcnLf39aDqHmtDU6cqRX5CiXrEBBq3hD-AjljSbsUDApF8Fi-MFCVy7nIrkIBOo7lj8vAGg"; // Hardcoded Secret Key

if (!clientId) {
  throw new Error("Client ID not set");
}

export default createThirdwebClient({ clientId, secretKey });
