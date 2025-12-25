import Plunk from "@plunk/node";
import { appenv } from "@/integrations/appenv";

export function getEmailSender() {
	return new Plunk(appenv.PLUNK_API_KEY).emails;
}
