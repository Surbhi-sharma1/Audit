import { BindingKey } from '@loopback/context';
import { ILogger } from './logger.interface';
export declare namespace LOGGER {
    /**
     * Injection key constant
     */
    const LOGGER_INJECT: string;
    /**
     * Binding keys used by this component.
     */
    namespace BINDINGS {
        const LOG_ACTION: BindingKey<ILogger>;
    }
    /**
     * Enum to define the supported log levels
     */
    enum LOG_LEVEL {
        DEBUG = 0,
        INFO = 1,
        WARN = 2,
        ERROR = 3,
        OFF = 4
    }
}
