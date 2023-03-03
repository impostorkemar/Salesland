from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://mabeSys:rootmabe@localhost:3306/mabesys")
#engine = create_engine("mysql+pymysql://mabeSys:Maberoot_2023@localhost:3306/mabesys")
meta = MetaData()

conn = engine.connect()