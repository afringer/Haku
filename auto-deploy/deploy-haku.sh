#!/bin/bash

if [ "$#" -ne 4 ] ; then
	echo "Missing hostname, user or path to private key or remote deployment path as command line argument."
	exit 1
fi
working_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
config_file="${working_dir}/config.sh"
deployment_host=$1
deployment_user=$2
deployment_key=$3
deployment_path=$4

if [ ! -e ${config_file} ] ; then
	echo "Missing config file from: ${config_file}"
	exit 1
fi
source ${config_file}


# Create a flat archive and deploy that on production
transfer_file_list=""
for file in ${required_source_files}; do
	echo "Checking for ${file}"
	if [ -e $file ] ; then
		transfer_file_list+=" ${file}"
	elif [ -e "auto-deploy/${file}" ] ; then
		cp -Rv auto-deploy/${file} .
		transfer_file_list+=" ${file}"
	fi
done

echo ${transfer_file_list}
ssh -i ${deployment_key} ${deployment_user}@${deployment_host} << EOF
[ -d ${deployment_path} ] && echo "skipping: ${deployment_path} exists" || mkdir -v ${deployment_path}
EOF
scp -i ${deployment_key} ${transfer_file_list} ${deployment_user}@${deployment_host}:${deployment_path}
ssh -i ${deployment_key} ${deployment_user}@${deployment_host} << EOF
cd ${deployment_path}
bash run-haku.sh
EOF
