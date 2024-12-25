- login(email,password) 
    -> {
        id,
        actor-type,
        token,
    }


- AdminHomePage(id)
    -> {
        hospitals: [
            {
                id,
                name,
            }
        ],
        // each hospital has its data
        // first time, give me data of first hospital
        hospital_data : {
            status: { 
                docs, // count
                radiologits, // count
                boilogists, // count
                nurses, // count
            },
            graph_data : {
                start_day,
                data: [] // array contains 7 entries, for each day of the week
            },
            patients: [ // uses pagination
                {
                    nss,
                    name,
                    gender,
                    address,
                    age,
                    logged_at,
                }
            ], 
            workers: [ // uses pagination
                {
                    type,
                    name,
                }
            ],         
        }
    }
- AdminGetHospitalData
    -> hospital_data

- AdminRequestPatients(page_number) 
    -> // return a list of patients like top, and uses pagging 
- AdminRequestWorkers(page_number) 
    -> // return a list of workers like top, and uses pagging 
- AdminSearchForWorker(name) 
    ->   {
        workers: [ // uses pagination
            {
                type,
                name,
            }
        ],
    }     
- AdminCreateWorker(name,email,phone,nss,role)
- AdminDeleteWorker(id)