from sqlalchemy import create_engine, MetaData

#engine = create_engine("mysql+pymysql://mabeSys:rootmabe@localhost:3306/mabesys")
engine = create_engine("mysql+pymysql://dmhost11_mabeSys:root_mabe@localhost:3306/dmhost11_mabesys")
meta = MetaData()

conn = engine.connect()