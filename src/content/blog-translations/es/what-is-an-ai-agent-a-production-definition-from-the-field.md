La mayoría de definiciones de «agente de IA» que circulan son abstracciones académicas o maquillaje de marketing para chatbots glorificados. Después de construir y operar varios sistemas de agentes en producción — desde interfaces en Telegram hasta orquestación multiagente en Oracle Cloud — he desarrollado una definición más práctica: un agente de IA es software que observa su entorno, decide acciones, las ejecuta y persiste estado entre interacciones. Todo lo demás es solo un envoltorio de chat.

## El bucle Observar → Decidir → Actuar → Persistir

¿Qué es un agente de IA en la práctica? No depende del LLM que uses ni de si puede navegar por la web. La distinción central está en este ciclo de cuatro pasos:

**Observar**: el agente ingiere señales de su entorno — webhooks de API, cambios en base de datos, mensajes del usuario, disparadores programados. Mis agentes de WhatsApp vigilan colas de mensajes en Oracle Cloud, interpretando texto y notas de voz. No esperan solo preguntas directas; siguen el contexto de la conversación, patrones del usuario y eventos del sistema.

**Decidir**: según las observaciones y el estado almacenado, el agente determina qué acción tomar. Esto no es solo «generar una respuesta». Mis agentes en producción enrutan entre Groq para respuestas críticas en velocidad y Claude para razonamiento complejo. Deciden si consultar una base de datos, llamar a una API externa o lanzar un subagente para tareas especializadas.

**Actuar**: el agente ejecuta su decisión en el entorno. Puede significar enviar un mensaje, actualizar una base de datos, disparar un flujo o llamar a otro servicio. Uno de mis agentes gestiona operaciones en Oracle Autonomous Database: no solo recomienda cambios de índices, los ejecuta según los patrones de consulta que observa.

**Persistir**: crucial y a menudo ignorado — los agentes deben mantener estado entre interacciones. No solo historial de conversación, sino preferencias aprendidas, progreso de tareas y contexto ambiental. Mis agentes usan PostgreSQL gestionado por Oracle para persistencia de estado, desde patrones de interacción hasta flujos de trabajo de varios pasos.

Sin los cuatro componentes, tienes un chatbot, no un agente. ¿Una conversación en ChatGPT que olvida todo entre sesiones? No es un agente. ¿Un script que actúa pero no observa cambios del entorno? Tampoco. La distinción importa porque los verdaderos agentes pueden manejar flujos complejos con estado que los sistemas simples de petición-respuesta no pueden.

## Persistencia de estado: la complejidad oculta

El paso persistir merece atención especial porque ahí fallan la mayoría de implementaciones de «agentes». El estado no es solo historial de conversación — es todo el contexto operativo del agente.

En mis sistemas multiagente, cada agente mantiene varias capas de estado:

**Estado de conversación**: más allá del historial de mensajes, incluye entidades extraídas, intenciones identificadas y seguimiento de fase. Cuando mi agente de Telegram ayuda a configurar recursos en la nube, recuerda no solo lo hablado sino en qué etapa de configuración estamos entre sesiones.

**Estado de usuario**: preferencias, permisos, patrones de interacción. Mis agentes aprenden que algunos usuarios prefieren explicaciones técnicas detalladas y otros resúmenes ejecutivos. No está codificado a fuego — se aprende y persiste.

**Estado de tarea**: los flujos multipaso exigen seguir progreso, resultados parciales y puntos de reversión. Cuando un agente aprovisiona recursos en Oracle Cloud debe registrar qué se creó, qué falló y qué limpieza hace falta si algo va mal.

**Estado ambiental**: estado de sistemas externos, límites de API, salud del servicio. Mis agentes detectan cuando las regiones de Oracle Cloud tienen incidencias o cuando la API de Groq va lenta y ajustan el comportamiento.

Gestionar este estado a escala no es trivial. Cada agente corre en contenedor en Oracle Kubernetes Engine, con estado sincronizado a PostgreSQL gestionado. El reto no es solo el almacenamiento — es garantizar consistencia cuando los agentes pueden terminarse, reiniciarse o escalarse horizontalmente en cualquier momento.

He visto equipos intentar meter todo en la ventana de contexto del LLM. Eso se rompe pronto. Las ventanas tienen límites, los tokens son caros y se pierde estado entre despliegues. Los agentes reales necesitan persistencia real.

## Orquestación multiagente en producción

Los agentes aislados están limitados por alcance y complejidad. Mis sistemas en producción usan orquestación multiagente, donde agentes especializados colaboran en tareas complejas.

Así funciona en la práctica: un agente orquestador maestro recibe una petición de alto nivel por Telegram: «Monta un nuevo entorno de desarrollo para mi equipo». El orquestador no intenta hacerlo todo solo. En cambio:

1. Lanza un agente de aprovisionamiento especializado en infraestructura Oracle Cloud
2. Crea un agente de seguridad para políticas IAM y reglas de red
3. Inicia un agente de monitorización para observabilidad
4. Coordina entre ellos, gestionando dependencias y conflictos

Cada agente especialista tiene su propio bucle observar-decidir-actuar-persistir. El agente de aprovisionamiento observa eventos de creación de recursos, decide la configuración según patrones del equipo, actúa llamando APIs de Oracle Cloud y persiste el estado de la infraestructura. Mientras tanto, el agente de seguridad observa los recursos creados, decide políticas adecuadas, las aplica y mantiene un registro de postura de seguridad.

El orquestador no es solo un enrutador de mensajes — mantiene estado global, resuelve conflictos entre agentes y garantiza consistencia del sistema. Cuando el agente de aprovisionamiento crea una instancia de cómputo, el orquestador se asegura de que el agente de seguridad cree reglas de entrada antes de que el de monitorización instale recolectores.

No es teórico — ejecuto exactamente este patrón en producción. Los retos son reales: sobrecoste de comunicación entre agentes, sincronización de estado entre agentes, manejo de fallos cuando un agente de la cadena rompe, depuración de decisiones distribuidas entre varios agentes.

Los servicios gestionados de Oracle Cloud ayudan pero no lo resuelven todo. Usamos Oracle Streaming Service para comunicación inter-agente, pero el orden de mensajes y la entrega exactamente una vez exigen diseño cuidadoso. La orquestación de contenedores en OKE gestiona el ciclo de vida del agente, pero coordinar agentes con estado durante actualizaciones continuas requiere lógica propia.

## Infraestructura real y restricciones

¿Qué es un agente de IA cuando quitas el hype y enfrentas restricciones de producción? Es un sistema distribuido con todos los problemas asociados.

**Latencia acumulada**: cada capa añade retardo. Mensaje del usuario → webhook de Telegram → balanceador → contenedor → lectura de estado en BD → llamada al LLM → formato de respuesta → API de Telegram. Mi p95 para consultas simples es 3,2 segundos. Los flujos multiagente complejos pueden tardar más de 30 segundos. Los usuarios lo notan.

**Multiplicación de costes**: los agentes toman muchas decisiones, cada una puede disparar llamadas al LLM. Una sola petición de usuario puede generar más de 10 invocaciones entre agentes. A 0,01 USD por 1K tokens, los costes se acumulan rápido. Enruto decisiones simples a Groq (más rápido y barato) y razonamiento complejo a Claude (mejor calidad, mayor coste).

**Modos de fallo**: los agentes fallan de formas en las que los chatbots no. La corrupción de estado hace que un agente crea que existe un recurso cuando no es así. Las particiones de red entre agentes generan visiones inconsistentes del mundo. La no determinidad del LLM implica que la misma observación puede disparar decisiones distintas. Mis agentes implementan reintentos extensos, validación de estado y procedimientos de rollback.

**Restricciones de recursos**: los agentes necesitan cómputo para la lógica de orquestación, memoria para caché de estado y almacenimiento persistente para historial. Cada agente en producción corre con mínimo 2 núcleos CPU y 4 GB RAM. Las operaciones de base de datos son el cuello de botella — incluso con pool de conexiones y optimización de consultas, la persistencia de estado añade 200–500 ms por ciclo de decisión.

**Complejidad de depuración**: cuando un sistema multiagente toma una decisión incorrecta, averiguar por qué no es trivial. Mantengo logging extensivo (enviado a Oracle Cloud Logging), pero correlacionar decisiones entre agentes exige herramientas propias. Cada agente emite logs estructurados con IDs de correlación, pero el volumen es abrumador — gigabytes al día para un sistema modesto.

La infraestructura en la que he terminado tras muchas iteraciones:
- Oracle Kubernetes Engine para orquestación de agentes
- PostgreSQL gestionado para estado (con réplicas de lectura para escalar)
- Oracle Streaming para mensajería entre agentes
- Redis para caché de estado
- Groq para decisiones críticas en velocidad
- Claude para razonamiento complejo
- Monitorización extensa con dashboards propios

No es la única forma de construir agentes, pero es lo que funciona a escala de producción con usuarios reales.

## Más allá de envoltorios de chat: aplicaciones reales de agentes

La diferencia entre un envoltorio de chat y un verdadero agente se aclara en casos de uso en producción. Aquí hay sistemas que he construido que no podrían existir sin el ciclo completo observar-decidir-actuar-persistir:

**Agente de operaciones de base de datos**: monitoriza rendimiento de consultas en Oracle Autonomous Database, identifica consultas lentas, analiza planes de ejecución, decide estrategias de índices, crea índices en ventanas de bajo tráfico y sigue el impacto en el tiempo. Un chatbot podría sugerir índices; solo un agente puede implementarlos y validarlos de forma autónoma.

**Atención multicanal**: observa mensajes en Telegram y WhatsApp, mantiene contexto unificado de usuario sin importar el canal, decide si resolver internamente o escalar, actúa respondiendo o creando tickets, y persiste historial por cumplimiento. Los usuarios que saltan de canal no tienen que repetirse.

**Orquestación de entornos de desarrollo**: vigila commits en ramas específicas, decide qué recursos aprovisionar según patrones de commit, levanta infraestructura Oracle Cloud adecuada y mantiene el estado del entorno entre miembros del equipo. Los desarrolladores obtienen entornos coherentes sin intervención manual.

**Agente de optimización de costes**: observa continuamente la utilización de recursos en tenencias Oracle Cloud, decide oportunidades de rightsizing, actúa programando redimensionamientos y persiste historial de optimización para evitar oscilaciones. Me ha ahorrado miles en costes de nube — algo que ningún chatbot podría hacer.

No son hipótesis — están corriendo ahora, tomando miles de decisiones al día. Cada uno exigió resolver retos reales de gestión de estado, manejo de errores y coordinación multiagente que las interfaces de chat simples no enfrentan.

¿Qué es un agente de IA en última instancia? Es software autónomo que puede mantener contexto y actuar en el tiempo. El bucle observar-decidir-actuar-persistir no es solo una definición — es la arquitectura mínima viable para sistemas que hacen trabajo real en entornos de producción. Todo lo demás es autocompletado caro.

— Elena Revicheva · [AIdeazz](https://aideazz.xyz) · [Portfolio](https://aideazz.xyz/portfolio)
