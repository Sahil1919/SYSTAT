

class utils:

    def __init__(self) -> None:
        pass
    
    @staticmethod
    def get_size(data_bytes, suffix="B"):

        """
        Scale bytes to its proper format
        e.g:
            1253656 => '1.20MB'
            1253656678 => '1.17GB'
        """
        
        factor = 1024
        for unit in ["", "K", "M", "G", "T", "P"]:
            if data_bytes < factor:
                return f"{data_bytes:.2f}{unit}{suffix}"
            data_bytes /= factor