
export function import_arguments(import_args: string[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let args = {} as any;
        const argv = JSON.parse(process.env.npm_config_argv ?? "{}").original ?? []

        if(argv){
        for (let index = 0; index < argv.length; index++) {
            let re = new RegExp('--([A-Za-z0-9_]+)=([^]+)'),
                matches = re.exec(argv[index]);

            if (matches !== null) {
                args[matches[1]] = matches[2];
            }
        }

        for (let index = 0; index < import_args.length; index++) {
            target[import_args[index]] = args[import_args[index]]
        }
    }

        return target
    }
}