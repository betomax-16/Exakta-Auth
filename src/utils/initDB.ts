import sucursalController from "../controllers/sucursalController";

export class initDB {
    constructor() {
        try {
            this.init();
        } catch (error) {
            console.log(error);
        }
    }

    async init() {
        const sucursals = await sucursalController.getAll();
        if (sucursals && sucursals.length === 0) {
            sucursalController.create({
                name: "Angelópolis",
                address: "Av. del Sol 2519 Col. Concepción la Cruz Reserva Territorial Atlixcáyotl Puebla, Pue, C.P. 72197",
                phoneNums: [
                    "(222) 303.31.00 ",
                    "(222) 240.10.10"
                ],
                reference: "Entre el Home Depot de Angelópolis y la prepa Ibero a un costado de CINIA."
            });
            sucursalController.create({
                name: "Huexotitla",
                address: "31 Oriente No. 210 Col. Carmen Huexotitla Puebla, Pue. C.P.72530",
                phoneNums: [
                    "(222) 303.31.00 ",
                    "(222) 240.10.10"
                ],
                reference: "A una cuadra de la Fiscalía General del Estado y del Parque Juarez."
            });
            sucursalController.create({
                name: "San Manuel",
                address: "Centro Médico de Especialidades Circuito Juan Pablo II esq. 18 Sur No. 5128-3 Col. San Manuel Puebla, Pue. C.P. 72570",
                phoneNums: [
                    "(222) 233.31.62"
                ],
                reference: "Centro Médico de Especialidades. Esquina de la 18 Sur y Circuito Juan Pablo II frente a Plaza Solé."
            });
            sucursalController.create({
                name: "Bugambilias",
                address: "Av. 16 de septiembre 5930A Col. Bugambilias Puebla, Pue. C.P. 72440",
                phoneNums: [
                    "(222) 244.70.71"
                ],
                reference: "Entre calle Nardos y Camelias, junto a Refaccionarias California"
            });
            sucursalController.create({
                name: "Las Ánimas",
                address: "Av. Fresnos esquina con Pinos No. 3931 Col. Las Ánimas, Puebla, Pue. C.P. 72400",
                phoneNums: [
                    "(222) 231.55.88"
                ],
                reference: "Atrás del Triángulo Las Ánimas, entre boulevard Atlixco y Circuito Juan Pablo II entrando por boulevard Atlixco"
            });
            sucursalController.create({
                name: "Atlixco",
                address: "Carretera Federal Puebla-Atlixco, Plaza Magestic local 3. Puebla, Pue. C.P. 72810",
                phoneNums: [
                    "(222) 242.79.33"
                ],
                reference: "En Plaza Magestic. De Sur a Norte antes de la Secretaría de Desarrollo Urbano y Ecología de San Andrés Cholula sobre el blvd Atlixco."
            });
            sucursalController.create({
                name: "Zavaleta I",
                address: "Calzada Zavaleta No. 4104-2 Sta. Cruz Buena Vista Puebla, Pue. C.P. 72170",
                phoneNums: [
                    "(222) 284.60.33"
                ],
                reference: "Entre Camino Real a Cholula y calle palmas antes de Office Depot."
            });
            sucursalController.create({
                name: "Zavaleta II",
                address: "Calzada Zavaleta No. 3916-B Sta. Cruz Buena Vista Plaza Office Depot Puebla, Pue. C.P. 72170",
                phoneNums: [
                    "(222) 169.55.49"
                ],
                reference: "Plaza Office Depot."
            });
            sucursalController.create({
                name: "Forjadores",
                address: "Blvd. Forjadores de Puebla #1010 local 3, Plaza Pabellón Forjadores San Pedro Cholula C.P, 72760",
                phoneNums: [
                    "(222) 289.76.18"
                ],
                reference: "Plaza Pabellón Forjadores. Entre la calle 10 Nte. Y 12 Nte. Frente a gasolinera “Gulf”."
            });
            sucursalController.create({
                name: "Cholula Recta",
                address: "Final Recta a Cholula No. 304-12 San Andrés Cholula, Pue. C.P. 72760",
                phoneNums: [
                    "(222) 261.90.28"
                ],
                reference: "Final Recta a Cholula. Plaza Pirámide junto a Llantera Contreras."
            });
            sucursalController.create({
                name: "Cholula Centro",
                address: "10 Poniente No. 322 San Pedro, Cholula, Pue. C.P. 72760",
                phoneNums: [
                    "(222) 247.57.60"
                ],
                reference: "Entre la 12 Pte. (Carretera Federal México-Puebla) y 10 Pte."
            });
            sucursalController.create({
                name: "Teziutlán",
                address: "Av. Teziutlán Norte #85, local 3 esq. San Martín Texmelucan Cerro de La Paz Puebla, Pue. C.P. 72160",
                phoneNums: [
                    "(222) 226.62.73"
                ],
                reference: "Entre calle Tepeaca y San Martín Texmelucan. A un costado de The Cofee York. Frente a Scotiabank"
            });
            sucursalController.create({
                name: "Tlaxco",
                address: "Av. Tlaxco No. 902-A Col. La Paz Puebla, Pue. C.P. 72160",
                phoneNums: [
                    "(222) 230.32.94"
                ],
                reference: "Entrando sobre la 9 Poniente entre la calle 29 Sur y Calle Tlaxco a una cuadra de la Avenida Juarez."
            });
            sucursalController.create({
                name: "San Pedro",
                address: "Blvd. Norte esquina 15 de Mayo 2210 Local 68 Puebla, Pue. C.P. 72070",
                phoneNums: [
                    "(222) 231.94.22"
                ],
                reference: "Centro comercial Plaza San Pedro zona de estacionamiento por OfficeMax."
            });
            sucursalController.create({
                name: "Loreto",
                address: "Plaza Loreto locales 15 y 16 Puebla, Pue. C.P. 72260",
                phoneNums: [
                    "(222) 408.02.13"
                ],
                reference: "Zona de estacionamiento de Plaza Loreto frente a Pizza Hut."
            });
            sucursalController.create({
                name: "Lomas de Angelópolis",
                address: "Blvd. Interamericano #102 local 2, Plaza Aquara Lomas de Angelópolis",
                phoneNums: [
                    "(222) 573.29.65"
                ],
                reference: "En Plaza Aquara. Por la entrada norte, frente a Soccer Academy a un costado de la universidad Interamericana."
            });
            sucursalController.create({
                name: "Explanada",
                address: "Plaza Explanada Calle Alejandra #512 local S-19A San Pedro Cholula, Pue. C.P. 72760",
                phoneNums: [
                    "(222) 399.38.05"
                ],
                reference: "Entrando a Plaza Explanada, antes del centro de espectáculos Auditorio Explanada."
            });
        }
    }
}